import { apiKeyRedeMet } from "../constants/constants";
import formattedDataRadar from "../utils/formattedDataRadar";
import { fetchRadarData } from "../utils/fetchRadarData"; // Assumindo que você exportou a função fetchRadarData de outro arquivo

export const getImages = async (typeRadar) => {
  const listImage = []; // array de urls
  const hoursSetting = localStorage.getItem("hourScope"); //escopo de horas selecionado pelo usuário

  try {
    const DataUTC = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
    const currentHour = new Date(DataUTC).getHours();
    let initialHour = currentHour - hoursSetting; // HORA INICIAL
    let actualDay = new Date(DataUTC).getDate();
    let actualMonth = new Date(DataUTC).getMonth() + 1;
    const actualYear = new Date(DataUTC).getFullYear();
    const formattedData = formattedDataRadar(actualMonth, actualDay);

    //BUSCA COMEÇA NO DIA ATUAL
    if (initialHour > 0) {
      console.log("BUSCA INICIA NO DIA ATUAL");
      //BUSCA VAI SER FEITA EM DUAS PARTES (DIA ATUAL E DIA SEGUINTE) POR CONTA DO UTC 
      if (currentHour > 23) {
        const hourLastDay = currentHour - hoursSetting;

        //percorre da hora inicial até a ultima hora do dia ATUAL em UTC ( +3horas)
        for (let h = hourLastDay; h <= 23; h++) {
          await fetchRadarData(listImage, typeRadar, apiKeyRedeMet, actualYear, formattedData, actualDay, h);
        }

        const nextDay = formattedData.Day + 1;
        const newHour = currentHour - 23;
        for (let h = 0; h <= newHour; h++) {
          await fetchRadarData(listImage, typeRadar, apiKeyRedeMet, actualYear, formattedData, nextDay, h);
        }
      } 
      //BUSCA ACONTECE NO MESMO DIA 
      else {
        for (let h = initialHour; h <= currentHour; h++) {
          await fetchRadarData(listImage, typeRadar, apiKeyRedeMet, actualYear, formattedData, actualDay, h);
        }
      }
    }
    //BUSCA ACONTECE NO DIA ANTERIOR
    if (initialHour < 0) {
      const previousDay = formattedData.Day - 1; //Dia anterior
      initialHour = 24 + initialHour; // Hora inicial do dia anterior

      for (let h = initialHour; h <= 23; h++) {
        await fetchRadarData(listImage, typeRadar, apiKeyRedeMet, actualYear, formattedData, previousDay, h);
      }
     //percorre da hora inicial até a ultima hora do dia ATUAL em UTC ( +3horas)
      for (let h = 0; h <= currentHour; h++) {
        await fetchRadarData(listImage, typeRadar, apiKeyRedeMet, actualYear, formattedData, actualDay, h);
      }
    }

    console.log(listImage);
    return listImage;
  } catch (error) {
    console.error("Erro ao obter os dados do radar:", error);
    throw error;
  }
};
