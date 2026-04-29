const API_URL = import.meta.env.VITE_API_URL;
export const getUnique = async () => {
  try {
    const response = await fetch(`${API_URL}/unique`);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("unique", JSON.stringify(data.data));
      //console.log(data.data);
    } else {
      localStorage.setItem("unique", JSON.stringify([]));
    }
  } catch (error) {
    console.error("Erro ao obter estações em pane:", error);
    localStorage.setItem("unique", JSON.stringify([]));
  }
};
