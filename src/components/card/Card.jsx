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
    console.log(inmetData);

    if (inmetData && typeof inmetData[codeStation] === 'object') {
      setData(inmetData[codeStation]);
    } else {
      setData(null); 
    }
  }, [trigger, codeStation]);

  const currentHour = new Date().getUTCHours();

  return (
    <div className={styles.container}>
      {data ? (
        <div className={styles.card}>
          <span>
            {codeStation} - {data.name[0]}
          </span>
          <span>
            <WiBarometer /> Pressão:{" "}
            {data.pressure[data.pressure.length - currentHour] === null
              ? "Sem dados"
              : data.pressure[data.pressure.length - currentHour] + " hPa"}
          </span>
          <span>
            <WiThermometerExterior /> Temp. Miníma:{" "}
            {data.tempMin[data.tempMin.length - currentHour] === null
              ? "Sem dados"
              : data.tempMin[data.tempMin.length - currentHour] + " ºC"}
          </span>
          <span>
            <WiThermometer /> Temp. Máxima:{" "}
            {data.tempMax[data.tempMax.length - currentHour] === null
              ? "Sem dados"
              : data.tempMax[data.tempMax.length - currentHour] + " ºC"}
          </span>
          <span>
            <WiRainMix /> Chuva:{" "}
            {data.rain[data.rain.length - currentHour] === null
              ? "Sem dados"
              : data.rain[data.rain.length - currentHour] + " mm"}
          </span>
          <span>
            <WiHumidity /> Umidade:{" "}
            {data.humidity[data.humidity.length - currentHour] === null
              ? "Sem dados"
              : data.humidity[data.humidity.length - currentHour] + "%"}
          </span>
          <span>
            <WiWindy /> Raj. Vento:{" "}
            {data.windBurst[data.windBurst.length - currentHour] === null
              ? "Sem dados"
              : data.windBurst[data.windBurst.length - currentHour] + " m/s"}
          </span>
          <span>
            <WiStrongWind /> Veloc. Vento:{" "}
            {data.windSpeed[data.windSpeed.length - currentHour] === null
              ? "Sem dados"
              : data.windSpeed[data.windSpeed.length - currentHour] + " m/s"}
          </span>
          <span>
            <WiWindDeg /> Direc. Vento:{" "}
            {data.windDirection[data.windDirection.length - currentHour] === null
              ? "Sem dados"
              : data.windDirection[data.windDirection.length - currentHour]}
          </span>
          <span>
            <WiTime5 /> Hora: {data.hour[currentHour]} horas
          </span>
        </div>
      ) : (
        <p>Carregando dados...</p> // Mostra uma mensagem enquanto os dados não são carregados
      )}
    </div>
  );
};
