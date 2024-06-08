export const fetchRadarData = async (
  listImage,
  typeRadar,
  apiKeyRedeMet,
  actualYear,
  formattedData,
  day,
  h
) => {
  const response = await fetch(
    `https://api-redemet.decea.mil.br/produtos/radar/${typeRadar}?api_key=${apiKeyRedeMet}&data=${actualYear}${formattedData.Month}${formattedData.Day}${h}`
  );
  if (!response.ok) {
    throw new Error("Não foi possível obter dados do radar");
  }
  const data = await response.json();

  const morroDaIgreja = data.data.radar[0].find(
    (item) => item.localidade === "mi"
  );
  const cangucu = data.data.radar[0].find((item) => item.localidade === "cn");
  const santiago = data.data.radar[0].find((item) => item.localidade === "sg");

  if (morroDaIgreja && cangucu && santiago) {
    listImage.push({
      // coloca o objeto com as url's de imagem de radar em listImage
      morroDaIgreja: morroDaIgreja.path,
      cangucu: cangucu.path,
      santiago: santiago.path,
    });
  }
};
