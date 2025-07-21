function setupWebSocket() {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.newCache) {
      console.log(
        `NOVO CACHE DISPONÍVEL PARA SATELITES: ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}`
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

interface CPTECImage {
  INPE: string[];
  CPPMET: string[];

}
export async function DataCPTECAPI(): Promise<CPTECImage> {
  try {
    const response = await fetch("http://localhost:3000/cptec-images");

    if (!response.ok) {
      throw new Error("Não foi possível obter dados do INMET");
    }

    const json: { data: CPTECImage } = await response.json();
    localStorage.setItem("CPTEC-Image", JSON.stringify(json.data));
    return json.data;

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao encontrar imagens", error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
    return {}; // <- opcional: retorna objeto vazio como fallback
  }
}

export function updateDataFromAPI(): void {
  DataCPTECAPI();
}