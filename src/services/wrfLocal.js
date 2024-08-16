export const wrfLocal = () => {
    const listImage = []; // array de urls
    let hoursSetting = 1; // Valor padrão para hoursSetting
    const storedHourScope = localStorage.getItem("hourScopeWRF");
  
    if (storedHourScope !== null) {
      hoursSetting = parseInt(storedHourScope); // Atualiza hoursSetting com o valor do localStorage
    }
  
    try {
      const currentHour = new Date().getHours();
      let actualDay = new Date().getDate(); //DIA
      const actualYear = new Date().getFullYear(); //ANO
      let actualMonth = new Date().getMonth() + 1; //MES
      actualMonth = "0" + actualMonth;

      const dateWRF = actualYear + "" + actualMonth + "" + actualDay;

      //BUSCA COMEÇA NO DIA ATUAL
    if (currentHour <= 23) {

        for (let h = 0; h < hoursSetting; h++) {
            const paddedHour = h.toString().padStart(2, '0');
            console.log(paddedHour)
            listImage.push(
                `../../public/wrf/${dateWRF - 1}/maxdbz_+_PNM_wrfout_${dateWRF - 1}_fcst_d01_${actualYear}-${actualMonth}-${actualDay}_${paddedHour}_00_00.png`,
            );
        }
    }
  
    } catch (error) {
      console.error("Erro ao obter os dados do radar:", error);
      throw error;
    }
    return listImage;  };

  