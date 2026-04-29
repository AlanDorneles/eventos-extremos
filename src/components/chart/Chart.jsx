import ReactApexChart from "react-apexcharts";
import { useCodeStation } from "../../contexts/codeStation";
import { usePhenomenaContext } from "../../contexts/Phenomena";
import { variablesPT } from "./variablesPT";
import { useScopeDaysContext } from "../../contexts/ScopeDays";
import { usePrefersDarkMode } from "../../utils/ThemedChart";

export const Graphic = () => {
  const { phenomena } = usePhenomenaContext();
  const { codeStation } = useCodeStation();
  const { scopeDays } = useScopeDaysContext();
  const selectedCodeStation =
    codeStation || localStorage.getItem("codeStation");

  let stationData = null;
  try {
    const dataStation = JSON.parse(localStorage.getItem("dataStation") || "{}");
    stationData = selectedCodeStation
      ? dataStation?.[selectedCodeStation]
      : null;
  } catch (err) {
    console.error("Erro ao ler dataStation:", err);
  }

  const nameVariable = variablesPT[phenomena] || "Dados";
  const fullSerie = Array.isArray(stationData?.[phenomena])
    ? stationData[phenomena]
    : [];
  const fullHours = Array.isArray(stationData?.hour) ? stationData.hour : [];
  const fullDates = Array.isArray(stationData?.data) ? stationData.data : [];

  // Mesmo padrão da página Estações: startIndex = length - scopeDays
  const length = Math.min(fullSerie.length, fullHours.length);
  const startIndex = Math.max(length - scopeDays, 0);

  const slicedData = fullHours.slice(startIndex, length).map((hour, index) => {
    const dataIndex = startIndex + index;
    const dateValue = fullDates[dataIndex] ?? "";
    return {
      x: dateValue ? `${dateValue} - ${hour}` : `${hour}`,
      y: fullSerie[dataIndex],
    };
  });

  const isDark = usePrefersDarkMode();
  const series = [
    {
      name: `${nameVariable}`,
      data: slicedData,
      colors: ["#F8A402"],
    },
  ];

  const options = {
    title: {
      text: `${nameVariable}`,
      align: "center", // ou 'left' ou 'right'
      style: {
        fontSize: "16px", // Tamanho da fonte
        color: isDark ? "#5dadefff" : "#333333", // Cor do texto do título
      },
    },
    chart: {
      id: "chart-line",
    },
    grid: {
      show: false,
    },
    xaxis: {
      type: "category",
      tickAmount: 4,
    },
    legend: {
      show: true,
    },

    stroke: {
      curve: "smooth",
      colors: ["#5dadefff"],
    },
    markers: {
      size: 0,
    },
  };

  if (!selectedCodeStation) {
    return <div style={{ padding: "1rem" }}>Selecione uma estação.</div>;
  }

  if (!stationData || slicedData.length === 0) {
    return (
      <div style={{ padding: "1rem" }}>
        Sem dados para o período selecionado.
      </div>
    );
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactApexChart
        options={options}
        series={series}
        type={phenomena === "rain" ? "bar" : "line"}
        height="100%"
      />
    </div>
  );
};
