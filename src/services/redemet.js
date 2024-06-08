import { apiKeyRedeMet} from "../constants/constants"

export const getRadarInformation = async () => {
    try {
      const DataUTC = new Date().toLocaleString('en-US', { timeZone: 'UTC' })
      let actualHour =  new Date(DataUTC).getHours();
      let actualDay = new Date(DataUTC).getDate()
      let actualMonth = new Date(DataUTC).getMonth() + 1
      const actualYear = new Date(DataUTC).getFullYear()

      if(actualMonth<10){
        actualMonth = "0"+ actualMonth
      }

      if (actualDay<10){
        actualDay = "0"+actualDay
      }

      const response = await fetch(`https://api-redemet.decea.mil.br/produtos/radar/maxcappi?api_key=${apiKeyRedeMet}&data=${actualYear}${actualMonth}${actualDay}${actualHour}`);
      if (!response.ok) {
        throw new Error('Não foi possível obter dados do radar');
    
      }
     
      const data = await response.json();
      const morroDaIgreja = data.data.radar[0].find(item => item.localidade === 'mi');
      const cangucu = data.data.radar[0].find(item => item.localidade === 'cn')
      const santiago = data.data.radar[0].find( item=> item.localidade === 'sg')

      
    return {cangucu,morroDaIgreja, santiago}
    
    } catch (error) {
      console.error('Erro ao obter os dados do radar:', error);
      throw error;
    }
  };