import { weatherStations, apiINMETKey } from "../constants/constants";

export const stationsData = async (dateInit, dateEnd) => {



    const response = await fetch(`https://apitempo.inmet.gov.br/token/estacao/${dateInit}/${dateEnd}/${weatherStations}/${apiINMETKey}`) 
    
    const data = await response.json()
    console.log(data)

}