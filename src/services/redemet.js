function setupWebSocket() {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.newCache) {
      console.log(
        `NOVO CACHE DISPONÍVEL ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}`
      );
      updateDataFromAPI();
    }
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };
  return () => {
    ws.close();
  };
}

export const getRadarInformation = async () => {
  try {
    const response = await fetch(`http://localhost:3000/get-images-redemet-free`);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("redemet-images", JSON.stringify(data.data));
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
setupWebSocket();
