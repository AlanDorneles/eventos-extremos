function setupWebSocket() {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.newCache) {
      console.log(
        `NOVO CACHE DISPONÍVEL PARA DADOS DE ESTAÇÕES : ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}`
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

export async function DataINMETAPI() {
  try {
    const response = await fetch(`http://localhost:3000/get-data-inmet-free`);
    if (!response.ok) {
      throw new Error("Não foi possível obter dados do INMET");
    }

    const data = await response.json();
    localStorage.setItem("dataStation", JSON.stringify(data.data));
    console.log("Dados armazenados no localStorage:", data.data);
    console.log(data.data);
  } catch (error) {
    console.error(error);
  }
}

function updateDataFromAPI() {
  DataINMETAPI();
}
setupWebSocket();
