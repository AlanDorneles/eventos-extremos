import { useEffect, useState } from "react";
import { DataStationsAPI } from "../services/inmetStations";
import ReactApexChart from "react-apexcharts";
import { MenuStation } from "../components/menuStation/MenuStation";
import { useCheckedsContext } from "../contexts/Checkeds";
import { StationData } from "../interfaces/Station";
import styles from "./styles/Estacao.module.css";
import { usePhenomenaContext } from "../contexts/Phenomena";
import { variablesPT } from "../components/chart/variablesPT";
import stations from "../components/menuMap/listStations";
import { useScopeDaysContext } from "../contexts/ScopeDays";
import { ApexOptions } from "apexcharts";
import { usePrefersDarkMode } from "../utils/ThemedChart";

const Estacao: React.FC = () => {
  const { checkeds } = useCheckedsContext();
  const [dataset, setDataset] = useState<Record<string, StationData>>({});
  const { phenomena } = usePhenomenaContext();
  const { scopeDays } = useScopeDaysContext();
  const allStations = stations.map((station) => station.id);

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
      name: data.name[0],
      data: slicedData,
    };
  });

  const isDark = usePrefersDarkMode(); 

  const options: ApexOptions = {
    
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
      <ReactApexChart
        options={options}
        series={series}
        type={phenomena === "rain" ? "bar" : "line"}
        height={"100%"}
      />
    </div>
  );
};

export default Estacao;
