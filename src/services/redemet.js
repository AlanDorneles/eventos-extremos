const API_URL = import.meta.env.VITE_API_URL



export const getRadarInformation = async () => {
  try {
    const response = await fetch(
      `${API_URL}/get-images-redemet-free-scrapping`
    );
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("redemet-images", JSON.stringify(data.data));
      //console.log(data.data);
    } else {
      console.error("ERRO NA REQUISIÇÃO");
    }
  } catch (error) {
    console.error("Erro ao obter os dados do radar:", error);
    throw error;
  }
};

function updateDataFromAPI() {
  getRadarInformation();
}

