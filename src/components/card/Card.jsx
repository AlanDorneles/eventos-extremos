import { useState, useEffect, useMemo } from "react";
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

// 1) Helpers: último índice válido e valor+hora
function lastValidIndex(arr) {
  if (!Array.isArray(arr)) return -1;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] != null) return i; // ignora null e undefined
  }
  return -1;
}

function lastValidValueAndHour(data, variable) {
  const arr = data?.[variable];
  const idx = lastValidIndex(arr);

  if (idx === -1) return { idx: -1, value: null, hour: null };

  return {
    idx,
    value: arr[idx],
    hour: Array.isArray(data?.hour) ? data.hour[idx] : null,
  };
}

// 2) Helper de renderização (evita repetir ternário)
function renderValue(obj, suffix = "") {
  return !obj || obj.idx === -1 ? "Sem dados" : `${obj.value}${suffix}`;
}

export const Card = () => {
  const [data, setData] = useState(null);
  const { codeStation } = useCodeStation();
  const storageCodeStation = localStorage.getItem("codeStation");
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (codeStation !== storageCodeStation) {
      setTrigger((prev) => !prev);
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

  // 3) Calcula “last” uma vez: custo O(192) por variável, apenas quando data muda
  const last = useMemo(() => {
    if (!data) return null;

    const get = (variable) => lastValidValueAndHour(data, variable);

    return {
      pressure: get("pressure"),
      tempMin: get("tempMin"),
      tempMax: get("tempMax"),
      rain: get("rain"),
      humidity: get("humidity"),
      windBurst: get("windBurst"),
      windSpeed: get("windSpeed"),
      windDirection: get("windDirection"),
      pressureSLP: get("pressureSLP"),
    };
  }, [data]);

  // 4) Se você quer mostrar “Hora” do último valor (ex.: pressão):
  const lastHour = last?.pressure?.idx === -1 ? null : last?.pressure?.hour;

  return (
    <div className={styles.container}>
      {data ? (
        <div className={styles.card}>
          <span>
            {codeStation} - {data?.name?.[0] ?? ""}
          </span>

          <span>
            <WiBarometer /> Pressão: {renderValue(last?.pressure, " hPa")}
          </span>

          <span>
            <WiThermometerExterior /> Temp. Miníma:{" "}
            {renderValue(last?.tempMin, " ºC")}
          </span>

          <span>
            <WiThermometer /> Temp. Máxima:{" "}
            {renderValue(last?.tempMax, " ºC")}
          </span>

          <span>
            <WiRainMix /> Chuva: {renderValue(last?.rain, " mm")}
          </span>

          <span>
            <WiHumidity /> Umidade: {renderValue(last?.humidity, "%")}
          </span>

          <span>
            <WiWindy /> Raj. Vento: {renderValue(last?.windBurst, " m/s")}
          </span>

          <span>
            <WiStrongWind /> Veloc. Vento: {renderValue(last?.windSpeed, " m/s")}
          </span>

          <span>
            <WiWindDeg /> Direc. Vento:{" "}
            {last?.windDirection?.idx === -1
              ? "Sem dados"
              : String(last?.windDirection?.value)}
          </span>

          <span>
            <WiBarometer /> Pressão NMM:{" "}
            {renderValue(last?.pressureSLP, " hPa")}
          </span>

          <span>
            <WiTime5 /> Hora: {lastHour == null ? "Sem dados" : `${lastHour} horas`}
          </span>
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};
