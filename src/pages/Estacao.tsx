import { useEffect, useState } from "react";
import { DataStationsAPI } from "../services/inmetStations";
import ReactApexChart from "react-apexcharts";
import { MenuStation } from "../components/menuStation/MenuStation";
import { useCheckedsContext } from "../contexts/Checkeds";
import { StationData } from "../interfaces/Station";
import styles from "./styles/Estacao.module.css";
import { usePhenomenaContext } from "../contexts/Phenomena";
import { variablesPT } from "../components/chart/variablesPT";
import { useScopeDaysContext } from "../contexts/ScopeDays";
import { ApexOptions } from "apexcharts";
import { usePrefersDarkMode } from "../utils/ThemedChart";

const Estacao: React.FC = () => {
  const { checkeds } = useCheckedsContext();
  const [dataset, setDataset] = useState<Record<string, StationData>>({});
  const { phenomena } = usePhenomenaContext();
  const { scopeDays } = useScopeDaysContext();
  const isDark = usePrefersDarkMode();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DataStationsAPI(checkeds);
        setDataset(data);
      } catch (error) {
        console.error("Erro ao obter informações das estações:", error);
      }
    };
    fetchData();
  }, [checkeds]);

  const series = Object.keys(dataset).map((stationCode) => {
    const data = dataset[stationCode];
    const length = data.hour.length;

    const startIndex = Math.max(length - scopeDays, 0);

    const slicedData = data.hour.slice(startIndex).map((hour, index) => ({
      x: `${data.data[startIndex + index]} - ${hour}`,
      y: data[`${phenomena}`][startIndex + index],
    }));

    return {
      name: data?.name?.[0] || stationCode,
      data: slicedData,
    };
  });

  // 1ª volta: cores fortes (sem variantes claras)
  const baseStrongPalette = [
    "#E53935", // vermelho
    "#F9A825", // amarelo
    "#FB8C00", // laranja
    "#6D4C41", // marrom
    "#8E24AA", // roxo
    "#EC407A", // rosa
    "#2E7D32", // verde
    "#00ACC1", // ciano
    "#757575", // cinza
    "#1565C0", // azul
  ];

  const softenHex = (hex: string, cycle: number) => {
    if (cycle <= 0) return hex;
    const clean = hex.replace("#", "");
    const num = Number.parseInt(clean, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    // A cada repetição, aproxima mais do branco (tom mais baixo/suave)
    const factor = Math.min(0.22 * cycle, 0.65);
    const nr = Math.round(r + (255 - r) * factor);
    const ng = Math.round(g + (255 - g) * factor);
    const nb = Math.round(b + (255 - b) * factor);

    return `#${[nr, ng, nb]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")}`;
  };

  // Repetições: mantém a cor base e suaviza o tom progressivamente
  const seriesColors = series.map((_, i) => {
    const baseIndex = i % baseStrongPalette.length;
    const cycle = Math.floor(i / baseStrongPalette.length);
    return softenHex(baseStrongPalette[baseIndex], cycle);
  });

  // Se não há dados selecionados, mostrar mensagem
  if (series.length === 0 || !series[0]?.data?.length) {
    return (
      <div className={styles.containerGraphic}>
        <MenuStation />
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Selecione estações para visualizar dados</p>
        </div>
      </div>
    );
  }

  const options: ApexOptions = {
    colors: seriesColors,
    
    title: {
      text: `${variablesPT[phenomena]}`,
      align: "center",
      style: {
        fontSize: "16px",
        color: isDark ? "#5dadefff":"#333333"
        
      }
    },
    chart: {
      id: "chart-line",
    },

    grid: {
      show: false,
    },

    xaxis: {
      categories: dataset,
      type: "category",
      tickAmount: 4,
    },
    legend: {
      show: !isMobile,
      position: "top",
      labels: {
        colors: isDark ? "#d9ecfa" : "#333333",
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
      //content: "A",
    },
  };

  return (
    <div className={styles.containerGraphic}>
      <MenuStation />
      <div className={styles.chartArea}>
        <ReactApexChart
          options={options}
          series={series}
          type={phenomena === "rain" ? "bar" : "line"}
          height={"100%"}
        />
      </div>

      {isMobile && (
        <div className={styles.legendBox}>
          {series.map((item, i) => (
            <div key={`${item.name}-${i}`} className={styles.legendItem}>
              <span
                className={styles.legendSwatch}
                style={{ backgroundColor: seriesColors[i] }}
              />
              <span className={styles.legendLabel}>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Estacao;
