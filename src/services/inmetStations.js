import { apiINMETKey } from "../constants/constants";
import { formattedDataFinal } from "../utils/formattedData";
import { windDegreesToDirection } from "../utils/windDegreesToDirection";

export const DataStationsAPI = async (stations) => {

  const dataArray = []; // Array para armazenar os dados de cada estação

  for (let i = 0; i < stations.length; i++) {
    const response = await fetch(
      `https://apitempo.inmet.gov.br/token/estacao/${formattedDataFinal}/${formattedDataFinal}/${stations[i]}/${apiINMETKey}`
    );

    if (!response.ok) {
      throw new Error("Não foi possível obter dados do inmet");
    }

    const data = await response.json();

    var DataINMET = {
      station: stations[i],
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

    data.forEach((item) => {
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

    dataArray.push(DataINMET); // Adicionar DataINMET ao array
  }

  return dataArray; // Retornar o array com os dados de todas as estações
};
