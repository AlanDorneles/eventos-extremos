import { apiKeyRedeMet} from "../constants/constants";

export const getImagesFromSatellite = async () => {
    let actualDay = new Date().getDate(); //DIA
    const actualYear = new Date().getFullYear(); //ANO
    let actualMonth = new Date().getMonth() + 1; //MES
    const currentHour = new Date().getHours() + 3; //UTC

    if(actualMonth<10){
        actualMonth = "0"+ actualMonth
      }

      if (actualDay<10){
        actualDay = "0"+actualDay
      }

    const responseRealcada = await fetch(
        `https://api-redemet.decea.mil.br/produtos/satelite/realcada?api_key=${apiKeyRedeMet}&data=${actualYear}${actualMonth}${actualDay}${currentHour}`
      );

      const responseVis = await fetch(
        `https://api-redemet.decea.mil.br/produtos/satelite/vis?api_key=${apiKeyRedeMet}&data=${actualYear}${actualMonth}${actualDay}${currentHour}`
      );

      const responseIr = await fetch(
        `https://api-redemet.decea.mil.br/produtos/satelite/ir?api_key=${apiKeyRedeMet}&data=${actualYear}${actualMonth}${actualDay}${currentHour}`
      );
    const dataRealcada = await responseRealcada.json()
    const dataVis = await responseVis.json()
    const dataIr = await responseIr.json()
    
    return {dataRealcada,dataVis, dataIr}
    }