import { useState, useEffect } from "react";
import { DataINMETAPI } from "../../services/inmet.js";
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
  const [data, setData] = useState([]);
  const {codeStation} = useCodeStation()
  const storageCodeStation = localStorage.getItem('codeStation')
  const [trigger,setTrigger] = useState(false)

  useEffect(() => {
    if (codeStation !== storageCodeStation) {
      setTrigger(prevTrigger => !prevTrigger);
    }
  }, [codeStation, storageCodeStation]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const inmetData = await DataINMETAPI();
        setData(inmetData);
      } catch (error) {
        console.error("Erro ao buscar dados do INMET:", error);
        // Trate o erro adequadamente, mostre uma mensagem de erro, etc.
      }
    };

    fetchData();
  }, [trigger]);

  const currentHour = new Date().getHours();

  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        return (
          <div key={index} className={styles.card}>
            <span>
              {item.station} - {item.name[0]}
            </span>
            <span>
              <WiBarometer /> Pressão: {(item.pressure[item.pressure.length - currentHour] === null ? "Sem dados" :item.pressure[item.pressure.length - currentHour] + " hPa" )}
            </span>
            <span>
              <WiThermometerExterior /> Temp. Miníma: {(item.tempMin[item.tempMin.length - currentHour] === null ? "Sem dados" : item.tempMin[item.tempMin.length - currentHour] +" ºC")}
            </span>
            <span>
              <WiThermometer /> Temp. Máxima: {(item.tempMax[item.tempMax.length - currentHour] === null ? "Sem dados" :item.tempMax[item.tempMax.length - currentHour]  +" ºC")} 
            </span>
            <span>
              <WiRainMix /> Chuva: {(item.rain[item.rain.length - currentHour] === null ? "Sem dados" :item.rain[item.rain.length - currentHour] +" mm") } 
            </span>
            <span>
              <WiHumidity /> Umidade: {(item.humidity[item.humidity.length - currentHour] === null ? "Sem dados" : item.humidity[item.humidity.length - currentHour] +"%")} 
            </span>
            <span>
              <WiWindy /> Raj. Vento: {(item.windBurst[item.windBurst.length - currentHour] === null ? "Sem dados" : item.windBurst[item.windBurst.length - currentHour]+ " m/s")}

            </span>
            <span>
              <WiStrongWind /> Veloc. Vento: {(item.windSpeed[item.windSpeed.length - currentHour] === null ? "Sem dados" : item.windBurst[item.windBurst.length - currentHour]+ " m/s")} 
            </span>
            <span>
              <WiWindDeg /> Direc. Vento: {(item.windSpeed[item.windDirection.length - currentHour] === null ? "Sem dados" : item.windDirection[item.windDirection.length - currentHour])}
            </span>
            <span>
              <WiTime5 /> Hora: {item.hour[currentHour]} horas
            </span>

          </div>
        );
      })}
    </div>
  );
};
