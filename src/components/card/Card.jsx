import { useState, useEffect } from "react";
import styles from "./cardsAll.module.css";
import { useCodeStation } from "../../contexts/codeStation.jsx";
import {
  WiBarometer,
  WiTime5,
  WiStrongWind,
  WiHumidity,
  WiWindDeg,
  WiRainMix,
  WiThermometer,
  WiThermometerExterior,
  WiWindy,
} from "react-icons/wi";

export const Card = () => {
  const [data, setData] = useState(null); // Inicializa como null
  const { codeStation } = useCodeStation();
  const storageCodeStation = localStorage.getItem("codeStation");
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (codeStation !== storageCodeStation) {
      setTrigger((prevTrigger) => !prevTrigger);
    }
  }, [codeStation, storageCodeStation]);

  useEffect(() => {
    const inmetData = JSON.parse(localStorage.getItem("dataStation"));

    if (inmetData && typeof inmetData[codeStation] === "object") {
      setData(inmetData[codeStation]);
    } else {
      setData(null);
    }
  }, [trigger, codeStation]);

  const currentHour = new Date().getUTCHours();
  const lastIndex = 168+currentHour-1;


  return (
    <div className={styles.container}>
      {data ? (
        <div className={styles.card}>
          <span>
            {codeStation} - {data.name[0]}
          </span>
          <span>
            <WiBarometer /> Pressão:{" "}
            {data.pressure[data.pressure[lastIndex]] === null
              ? "Sem dados"
              : data.pressure[data.pressure[lastIndex]] + " hPa"}
          </span>
          <span>
            <WiThermometerExterior /> Temp. Miníma:{" "}
            {data.tempMin[data.tempMin[lastIndex]] === null
              ? "Sem dados"
              : data.tempMin[data.tempMin[lastIndex]] + " ºC"}
          </span>
          <span>
            <WiThermometer /> Temp. Máxima:{" "}
            {data.tempMax[data.tempMax[lastIndex]] === null
              ? "Sem dados"
              : data.tempMax[data.tempMax[lastIndex]] + " ºC"}
          </span>
          <span>
            <WiRainMix /> Chuva:{" "}
            {data.rain[data.rain[lastIndex]] === null
              ? "Sem dados"
              : data.rain[data.rain[lastIndex]] + " mm"}
          </span>
          <span>
            <WiHumidity /> Umidade:{" "}
            {data.humidity[data.humidity[lastIndex]] === null
              ? "Sem dados"
              : data.humidity[data.humidity[lastIndex]] + "%"}
          </span>
          <span>
            <WiWindy /> Raj. Vento:{" "}
            {data.windBurst[data.windBurst[lastIndex]] === null
              ? "Sem dados"
              : data.windBurst[data.windBurst[lastIndex]] + " m/s"}
          </span>
          <span>
            <WiStrongWind /> Veloc. Vento:{" "}
            {data.windSpeed[data.windSpeed[lastIndex]] === null
              ? "Sem dados"
              : data.windSpeed[data.windSpeed[lastIndex]] + " m/s"}
          </span>
          <span>
            <WiWindDeg /> Direc. Vento:{" "}
            {data.windDirection[data.windDirection[lastIndex]] ===
            null
              ? "Sem dados"
              : data.windDirection[data.windDirection[lastIndex]]}
          </span>
          <span>
            <WiBarometer /> Pressão NMM:{" "}
            {data.pressureSLP[data.pressureSLP[lastIndex]] === null
              ? "Sem dados"
              : data.pressureSLP[data.pressureSLP[lastIndex]] + " hPa"}
          </span>
          <span>
            <WiTime5 /> Hora: {data.hour[currentHour]} horas
          </span>


        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};
