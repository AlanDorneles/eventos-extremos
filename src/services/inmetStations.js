import { DataINMETAPI } from "./inmet";

export const DataStationsAPI = async (stationCodes) => {
  let stationsData = JSON.parse(localStorage.getItem("stationsData")) || {}; // SELECIONADOS
  const dataStation = JSON.parse(localStorage.getItem("dataStation")); // DADOS DO BACKEND
  if (!dataStation) {
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
      
    });
  } else {
    newStationCodes.forEach((stationCode) => {
      const data = dataStation[stationCode];
    
      if (data) {
        stationsData[stationCode] = data;
       
      } 
    });
  }
  localStorage.setItem("stationsData", JSON.stringify(stationsData));
  return stationsData;
};
