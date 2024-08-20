function wrfLocal(selectedDate) {
  let listImage = [];
  if (/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
    // Formato já está correto, não faz nada
  } else if (/^\d{8}$/.test(selectedDate)) {
    selectedDate = `${selectedDate.substring(0, 4)}-${selectedDate.substring(4, 6)}-${selectedDate.substring(6, 8)}`;
  } else {
    console.error("Formato de data inválido:", selectedDate);
    return [];
  }

  const dateParts = selectedDate.split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  const dateWRF = `${year}${month}${day}`;

  try {
    for (let h = 0; h < 24; h++) {
      const paddedHour = h.toString().padStart(2, '0');
      listImage.push(
        `../../public/wrf/${dateWRF}/maxdbz_+_PNM_wrfout_${dateWRF}_fcst_d01_${year}-${month}-${day}_${paddedHour}_00_00.png`
      );
    }
  } catch (error) {
    console.error("Erro ao obter os dados do WRF:", error);
    throw error;
  }
  return listImage;
}

export { wrfLocal };