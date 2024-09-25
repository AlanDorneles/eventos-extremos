import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useCodeStation } from "../../contexts/codeStation";
import { usePhenomenaContext } from "../../contexts/Phenomena";
import { variablesPT } from "./variablesPT";
import { useScopeDaysContext } from "../../contexts/ScopeDays";

export const Graphic = () => {
  const { phenomena } = usePhenomenaContext();
  const [variable, setVariable] = useState(null);
  const [hour, setHour] = useState(null);
  const { codeStation } = useCodeStation();
  const storageCodeStation = localStorage.getItem("codeStation");
  const [trigger, setTrigger] = useState(false);
  const [nameVariable, setNameVariable] = useState("Pressão");
  const { scopeDays } = useScopeDaysContext()

  useEffect(() => {
    if (codeStation !== storageCodeStation) {
      setTrigger((prevTrigger) => !prevTrigger);
      console.log('mudou de estação')
    }
  }, [codeStation, storageCodeStation]);
  useEffect(() => {
    const dataMeteorologic = JSON.parse(localStorage.getItem("dataStation"));
    console.log(dataMeteorologic)
    console.log(codeStation,phenomena)
    setVariable(dataMeteorologic[codeStation][phenomena].slice(-scopeDays));
    setHour(dataMeteorologic[codeStation]['hour'].slice(-scopeDays));
    setNameVariable(variablesPT[phenomena]);
  }, [trigger, phenomena,codeStation,scopeDays]);

  const series = [
    {
      name: `${nameVariable}`,
      data: variable,
      colors: ["#F8A402"],
    },
  ];

  const options = {
    title: {
      text: `${nameVariable}`,
      align: "center", // ou 'left' ou 'right'
      style: {
        fontSize: "16px", // Tamanho da fonte
        color: "#333", // Cor do texto do título
      },
    },
    chart: {
      id: "chart-line",
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: hour,
      type: "string",
      tickAmount: 4,
    },
    stroke: {
      curve: "smooth",
      colors: ["#F8A402"],
    },
    markers: {
      size: 8,
      content: "A",
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" />
    </div>
  );
};
