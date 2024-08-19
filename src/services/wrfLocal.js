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

      let h = 0;

      for (h = 0; h < 0 + 24; h++) {
        const paddedHour = (h % 24).toString().padStart(2, '0');
        listImage.push(
          `../../public/wrf/${dateWRF}/maxdbz_+_PNM_wrfout_${dateWRF}_fcst_d01_${actualYear}-${actualMonth}-${actualDay}_${paddedHour}_00_00.png`
        );
      }
    }

    catch (error) {
      console.error("Erro ao obter os dados do radar:", error);
      throw error;
    }
    return listImage;
  };