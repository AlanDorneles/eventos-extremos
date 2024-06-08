import { apiINMETKey } from "../constants/constants";
import { formattedDataInit, formattedDataFinal } from "../utils/formattedData";
import { weatherStations } from "../constants/constants";
import { windDegreesToDirection } from "../utils/windDegreesToDirection";

export const DataStationsAPI = async () => {
  const codeStation = weatherStations;
  for (let i = 0; i < weatherStations.length; i++) {
    const response = await fetch(
      `https://apitempo.inmet.gov.br/token/estacao/${formattedDataInit}/${formattedDataFinal}/${codeStation[i]}/${apiINMETKey}`
    );

    if (!response.ok) {
      throw new Error("Não foi possível obter dados do inmet");
    }

    const data = await response.json();
    console.log(data);

    const filteredData = data.filter(
      (item) => item !== null && item.PRE_INS !== null
    );

    if (filteredData.length === 0) {
      throw new Error("Não há dados válidos disponíveis"); //Erro caso a API retorne valores vazios
    }
    var DataINMET = {
      station: codeStation,
      pressure: [],
      hour: [],
      windDirection: [],
      windSpeed: [],
      rain: [],
      tempMin: [],
      tempMax: [],
      windBurst: [],
      humidity: [],
      name: [],
      degree: [],
    };

    filteredData.forEach((item) => {
      DataINMET.pressure.push(item.PRE_INS);
      DataINMET.hour.push(
        `${item.HR_MEDICAO.slice(0, 2)}:${item.HR_MEDICAO.slice(2, 4)}` //HR_MEDICAO de XXXX para XX:XX
      );
      DataINMET.windDirection.push(windDegreesToDirection(item)); //GRAUS PARA DIREÇÃO ( NORTE, NORDESTE, SUDESTE ....)
      DataINMET.windSpeed.push(item.VEN_VEL);
      DataINMET.rain.push(item.CHUVA);
      DataINMET.tempMin.push(item.TEM_MIN);
      DataINMET.tempMax.push(item.TEM_MAX);
      DataINMET.windBurst.push(item.VEN_RAJ);
      DataINMET.humidity.push(item.UMD_INS);
      DataINMET.name.push(item.DC_NOME);
      DataINMET.degree.push(item.VEN_DIR);
    });
  }
  return DataINMET;
};
