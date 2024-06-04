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
  console.log(data);

  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        return (
          <div key={index} className={styles.card}>
            <span>
              {item.station} - {item.name[0]}
            </span>
            <span>
              <WiBarometer /> Pressão {item.pressure[item.pressure.length -1]} bar
            </span>
            <span>
              <WiThermometerExterior /> Temp. Miníma {item.tempMin[item.tempMin.length -1]} ºC
            </span>
            <span>
              <WiThermometer /> Temp. Máxima {item.tempMax[item.tempMax.length -1]} ºC
            </span>
            <span>
              <WiRainMix /> Chuva {item.rain[item.rain.length -1]} mm
            </span>
            <span>
              <WiHumidity /> Umidade {item.humidity[item.humidity.length -1]} %{" "}
            </span>
            <span>
              <WiWindy /> Raj. Vento {item.windBurst[item.windBurst.length -1]} m/s
            </span>
            <span>
              <WiStrongWind /> Veloc. Vento {item.windSpeed[item.windSpeed.length -1]} m/s
            </span>
            <span>
              <WiWindDeg /> Direc. Vento {item.windDirection[item.windDirection.length -1]}
            </span>
            <span>
              <WiTime5 /> Hora {item.hour[item.hour.length -1]} horas
            </span>

          </div>
        );
      })}
    </div>
  );
};
