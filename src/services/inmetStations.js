import { DataINMETAPI } from "./inmet";

export const DataStationsAPI = async (stationCodes) => {
  let stationsData = JSON.parse(localStorage.getItem("stationsData")) || {}; // SELECIONADOS
  const dataStation = JSON.parse(localStorage.getItem("dataStation")); // DADOS DO BACKEND


  if (!dataStation) {
    console.log("Nenhum dado disponível no localStorage.");
    DataINMETAPI()
  }

  const handlerKeys = Object.keys(stationsData);
  const newStationCodes = stationCodes.filter(
    (stationCode) => !handlerKeys.includes(stationCode)
  );

  if (newStationCodes.length === 0) {
    const removedStations = handlerKeys.filter(
      (stationCode) => !stationCodes.includes(stationCode)
    );
    removedStations.forEach((stationCode) => {
      delete stationsData[stationCode];
      console.log(`Estação removida: ${stationCode}`);
    });
  } else {
    newStationCodes.forEach((stationCode) => {
      const data = dataStation[stationCode];
      console.log(dataStation);
      if (data) {
        stationsData[stationCode] = data;
        console.log(`Dados adicionados para a estação: ${stationCode}`);
      } else {
        console.log(`Nenhum dado encontrado para a estação: ${stationCode}`);
      }
    });
  }
  localStorage.setItem("stationsData", JSON.stringify(stationsData));
  console.log("StationsData atualizado:", stationsData);
  return stationsData;
};
