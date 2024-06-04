import { apiKeyRedeMet} from "../constants/constants";

export const getImages = async (typeRadar) => {
  console.log('radar:',typeRadar)
  const listImage = []; // array de urls
  const hoursSetting = localStorage.getItem("hourScope"); //escopo de horas selecionado pelo usuário
  try {
    const currentHour = new Date().getHours() + 3; //UTC
    let actualDay = new Date().getDate(); //DIA
    const actualYear = new Date().getFullYear(); //ANO
    let actualMonth = new Date().getMonth() + 1; //MES
    let initialHour = currentHour - hoursSetting; // HORA INICIAL

    if(actualMonth<10){
      actualMonth = "0"+ actualMonth
    }

    if (actualDay<10){
      actualDay = "0"+actualDay
    }

    //BUSCA COMEÇA NO DIA ATUAL
    if (initialHour > 0) {
      console.log("BUSCA INICIA NO DIA ATUAL");
      //BUSCA VAI SER FEITA EM DUAS PARTES (DIA ATUAL E DIA SEGUINTE) POR CONTA DO UTC 
      if (currentHour > 23) {
        console.log("hora de agora maior que 23", currentHour);
        const hourLastDay = currentHour - hoursSetting
        console.log("hora inicial ", hourLastDay);
        console.log('dia inicial', actualDay)

        //percorre da hora inicial até a ultima hora do dia ATUAL em UTC ( +3horas)
        for (let h = hourLastDay; h <= 23; h++) {
          const response = await fetch(
            `https://api-redemet.decea.mil.br/produtos/radar/${typeRadar}?api_key=${apiKeyRedeMet}&data=${actualYear}${actualMonth}${actualDay}${h}`
          );
          if (!response.ok) {
            throw new Error("Não foi possível obter dados do radar");
          }
          const data = await response.json();

          const morroDaIgreja = data.data.radar[0].find((item) => item.localidade === 'mi');
          const cangucu = data.data.radar[0].find((item) => item.localidade === 'cn');
          const santiago = data.data.radar[0].find((item) => item.localidade === 'sg');

          if (morroDaIgreja && cangucu && santiago) {
            listImage.push({
              // coloca o objeto com as url's de imagem de radar em listImage
              morroDaIgreja: morroDaIgreja.path,
              cangucu: cangucu.path,
            });
          }
        }

        const nextDay = actualDay + 1;
        const newHour = currentHour - 23;
        console.log("hora final", newHour);
        console.log("dia final", nextDay);
        for (let h = 0; h <= newHour; h++) {
          //percorre da hora inicial até a hora atual
          const response = await fetch(
            `https://api-redemet.decea.mil.br/produtos/radar/${typeRadar}?api_key=${apiKeyRedeMet}&data=${actualYear}${actualMonth}${nextDay}${h}`
          );
          if (!response.ok) {
            throw new Error("Não foi possível obter dados do radar");
          }
          const data = await response.json();
          const morroDaIgreja = data.data.radar[0].find((item) => item.localidade === 'mi');
          const cangucu = data.data.radar[0].find((item) => item.localidade === 'cn');
          const santiago = data.data.radar[0].find((item) => item.localidade === 'sg');
          if (morroDaIgreja && cangucu && santiago) {
            listImage.push({
              // coloca o objeto com as url's de imagem de radar em listImage
              morroDaIgreja: morroDaIgreja.path,
              cangucu: cangucu.path,
              santiago: santiago.path
            });
          }
        }
      } 
      //BUSCA ACONTECE NO MESMO DIA 
      else {
        for (let h = initialHour; h <= currentHour; h++) {

          //percorre da hora inicial até a hora atual
          const response = await fetch(
            `https://api-redemet.decea.mil.br/produtos/radar/${typeRadar}?api_key=${apiKeyRedeMet}&data=${actualYear}${actualMonth}${actualDay}${h}`
          );
          if (!response.ok) {
            throw new Error("Não foi possível obter dados do radar");
          }
          const data = await response.json();
          const morroDaIgreja = data.data.radar[0].find((item) => item.localidade === 'mi');
          const cangucu = data.data.radar[0].find((item) => item.localidade === 'cn');
          const santiago = data.data.radar[0].find((item) => item.localidade === 'sg');
          if (morroDaIgreja && cangucu && santiago) {
            listImage.push({
              // coloca o objeto com as url's de imagem de radar em listImage
              morroDaIgreja: morroDaIgreja.path,
              cangucu: cangucu.path,
              santiago:santiago.path
            });
          }
          
        }
      }
    }
    //BUSCA ACONTECE NO DIA ANTERIOR
    if (initialHour < 0) {
      const previousDay = actualDay - 1; //Dia anterior
      console.log(initialHour)
      initialHour = 24 + initialHour; // Hora inicial do dia anterior
      console.log('hora inicial:',initialHour)
      console.log('dia inicial:', previousDay)

      //percorre da hora inicial até a ultima hora do dia ANTERIOR em UTC ( +3horas)
      for (let h = initialHour; h <= 23; h++) {
        
        const response = await fetch(
          `https://api-redemet.decea.mil.br/produtos/radar/${typeRadar}?api_key=${apiKeyRedeMet}&data=${actualYear}${actualMonth}${previousDay}${h}`
        );
        if (!response.ok) {
          throw new Error("Não foi possível obter dados do radar");
        }
        const data = await response.json();
        const morroDaIgreja = data.data.radar[0].find((item) => item.localidade === 'mi');
        const cangucu = data.data.radar[0].find((item) => item.localidade === 'cn');
        const santiago = data.data.radar[0].find((item) => item.localidade === 'sg');
        


        if (morroDaIgreja && cangucu && santiago) {
          console.log('ok')
          listImage.push({
            morroDaIgreja: morroDaIgreja.path,
            cangucu: cangucu.path,
            santiago: santiago.path

          });
        }
      }

      
      //percorre da hora inicial até a ultima hora do dia ATUAL em UTC ( +3horas)
      for (let h = 0; h <= currentHour; h++) {
        console.log('hora final:',currentHour)
        console.log('dia inicial:', actualDay)
        const response = await fetch(
          `https://api-redemet.decea.mil.br/produtos/radar/${typeRadar}?api_key=${apiKeyRedeMet}&data=${actualYear}${actualMonth}${actualDay}${h}`
        );
        if (!response.ok) {
          throw new Error("Não foi possível obter dados do radar");
        }
        const data = await response.json();
        const morroDaIgreja = data.data.radar[0].find((item) => item.localidade === 'mi');
        const cangucu = data.data.radar[0].find((item) => item.localidade === 'cn');
        const santiago = data.data.radar[0].find((item) => item.localidade === 'sg');

        if (morroDaIgreja && cangucu && santiago) {
          listImage.push({
            morroDaIgreja: morroDaIgreja.path,
            cangucu: cangucu.path,
            santiago: santiago.path
          });
        }
      }
    }

    console.log(listImage);
    return listImage;
  } catch (error) {
    console.error("Erro ao obter os dados do radar:", error);
    throw error;
  }
};
