import { apiINMETKey } from "../constants/constants";
import { formattedDataFinal } from "../utils/formattedData";

export const DataINMETAPI = async () => {
  const DataINMET = [];
  const codeStation = localStorage.getItem('codeStation')
  const response = await fetch(
    `https://apitempo.inmet.gov.br/token/estacao/${formattedDataFinal}/${formattedDataFinal}/${codeStation}/${apiINMETKey}`
  );
  if (!response.ok) {
    throw new Error("Não foi possível obter dados do inmet");
  }
  const data = await response.json();
 

  const windDegreesToDirection = (degree) => {
    let degreeNumber = Number(degree.VEN_DIR);
    if (degreeNumber > 0 && degreeNumber < 45) {
      return "NORTE";
    } else if (degreeNumber >= 45 && degreeNumber < 90) {
      return "NORDESTE";
    } else if (degreeNumber >= 90 && degreeNumber < 135) {
      return "LESTE";
    } else if (degreeNumber >= 135 && degreeNumber < 180) {
      return "SUDESTE";
    } else if (degreeNumber >= 180 && degreeNumber < 225) {
      return "SUL";
    } else if (degreeNumber >= 225 && degreeNumber < 270) {
      return "SUDOESTE";
    } else if (degreeNumber >= 270 && degreeNumber < 315) {
      return "OESTE";
    } else if (degreeNumber >= 315 && degreeNumber < 360) {
      return "NOROESTE";
    } else {
      return "NORTE"; // Caso o valor seja 360 graus (o equivalente a 0 graus)
    }
  };

  const filteredData = data.filter(
    (item) => item !== null && item.PRE_INS !== null
  );
  const pressure = filteredData.map((item) => item.PRE_INS);

  const hour = filteredData.map(
    (item) => `${item.HR_MEDICAO.slice(0, 2)}:${item.HR_MEDICAO.slice(2, 4)}`
  );

  const windDirection = filteredData.map((item) =>
    windDegreesToDirection(item)
  );
  const windSpeed = filteredData.map((item) => item.VEN_VEL);
  const station = codeStation;
  const rain = filteredData.map((item) => item.CHUVA);
  const tempMin = filteredData.map((item) => item.TEM_MIN);
  const tempMax = filteredData.map((item) => item.TEM_MAX);
  const windBurst = filteredData.map((item) => item.VEN_RAJ);
  const humidity = filteredData.map((item) => item.UMD_INS);
  const name = filteredData.map((item) => item.DC_NOME)
  const degree = filteredData.map((item) => item.VEN_DIR)

  DataINMET.push({
    station,
    pressure,
    hour,
    windDirection,
    windSpeed,
    rain,
    tempMin,
    tempMax,
    windBurst,
    humidity,
    name,
    degree
  });

  return DataINMET;
};
