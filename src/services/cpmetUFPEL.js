export const CPPMETImages = () => {
  const listImage = []; // array de urls
  let hoursSetting = 1; // Valor padrão para hoursSetting
  const storedHourScope = localStorage.getItem("hourScopeSatelite");

  if (storedHourScope !== null) {
    hoursSetting = parseInt(storedHourScope); // Atualiza hoursSetting com o valor do localStorage
  }

  try {
    const currentHour = new Date().getHours() + 2; //UTC - 1
    let actualDay = new Date().getDate(); //DIA
    const actualYear = new Date().getFullYear(); //ANO
    let actualMonth = new Date().getMonth() + 1; //MES
    let initialHour = currentHour - hoursSetting; // HORA INICIAL

    if (actualMonth < 10) {
      actualMonth = "0" + actualMonth;
    }

    if (actualDay < 10) {
      actualDay = "0" + actualDay;
    }

    //BUSCA COMEÇA NO DIA ATUAL
    if (initialHour > 0) {
      if (currentHour < 7) {
        listImage.push(`https://cdn.browshot.com/static/images/not-found.png`);
      }
      if (currentHour <= 23) {
        const hour = currentHour - hoursSetting;

        //percorre da hora inicial até a ultima hora do dia ATUAL em UTC ( +3horas)
        for (let h = hour; h <= currentHour; h++) {
          listImage.push(
            `https://cppmet.ufpel.edu.br/site/dados/GOES/C02//GOES16_Canal_C02_${actualYear}_${actualMonth}_${actualDay}_${h}_00_zoom.png`
          );
          listImage.push(
            `https://cppmet.ufpel.edu.br/site/dados/GOES/C02//GOES16_Canal_C02_${actualYear}_${actualMonth}_${actualDay}_${h}_30_zoom.png`
          );
        }
      }
    }

  } catch (error) {
    console.error("Erro ao obter os dados do radar:", error);
    throw error;
  }
  return listImage;
};
