import { INMETDataRaw } from "../interfaces/Station";

function setupWebSocket() {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onmessage = (event: MessageEvent) => {
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

setupWebSocket();

export async function DataINMETAPI(): Promise<INMETDataRaw> {
  try {
    const response = await fetch("http://localhost:3000/get-data-inmet-free");

    if (!response.ok) {
      throw new Error("Não foi possível obter dados do INMET");
    }

    const json: { data: INMETDataRaw } = await response.json();

    localStorage.setItem("dataStation", JSON.stringify(json.data));
    

    return json.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar dados do INMET:", error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
    return {}; 
  }
}

export function updateDataFromAPI(): void {
  DataINMETAPI();
}
