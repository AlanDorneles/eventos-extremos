function wrfLocal(selectedDate) {
  let listImage = [];
  // Converte a data selecionada para o formato necessário
  const dateParts = selectedDate.split("-");
  const dateWRF = `${dateParts[0]}${dateParts[1]}${dateParts[2]}`;

  try {
    const actualYear = dateParts[0];
    const actualMonth = dateParts[1];
    const actualDay = dateParts[2];

    for (let h = 0; h < 24; h++) {
      const paddedHour = h.toString().padStart(2, '0');
      listImage.push(
        `../../public/wrf/${dateWRF}/maxdbz_+_PNM_wrfout_${dateWRF}_fcst_d01_${actualYear}-${actualMonth}-${actualDay}_${paddedHour}_00_00.png`
      );
    }
  } catch (error) {
    console.error("Erro ao obter os dados do WRF:", error);
    throw error;
  }
  return listImage;
}

export { wrfLocal };