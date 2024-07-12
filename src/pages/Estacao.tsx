import React, { useEffect, useState } from "react";
import { DataStationsAPI } from "../services/inmetStations";
import ReactApexChart from "react-apexcharts";
import { MenuStation } from "../components/menuStation/MenuStation";
import { useCheckedsContext } from "../contexts/Checkeds";
import { StationData } from "../utils/stationData";
import styles from "./styles/Estacao.module.css";
import { usePhenomenaContext } from "../contexts/Phenomena";
import { variablesPT } from "../components/chart/variablesPT";
import stations from "../components/menuMap/listStations";

const Estacao: React.FC = () => {
  const { checkeds} = useCheckedsContext();
  const [dataset, setDataset] = useState<StationData[]>([]);
  const { phenomena } = usePhenomenaContext();
  const allStations =  stations.map( station => station.id)


  useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await DataStationsAPI(checkeds);
          setDataset(data);
  
        } catch (error) {
          console.error("Erro ao obter informações do radar:", error);
        }
      }
    fetchData();
  }, [checkeds]);

  const series = dataset.map((data) => ({
    name: data.name[0],
    data: data.hour.map((hour, index) => ({
      x: hour,
      y: data[`${phenomena}`][index],
    })),
  }));
  const options = {
    title: {
      text: `${variablesPT[phenomena]}`,
      align: "center",
      style: {
        fontSize: "16px",
        color: "#333",
      },
    },
    chart: {
      id: "chart-line",
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: dataset,
      type: "string",
      tickAmount: 4,
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 0,
      content: "A",
    },
  };

  return (
    <div className={styles.containerGraphic}>
      <MenuStation />
      <ReactApexChart options={options} series={series} type="line" />
    </div>
  );
};

export default Estacao;
