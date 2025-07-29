import { INMETDataRaw } from "../interfaces/Station";
const API_URL = import.meta.env.VITE_API_URL

export async function DataINMETAPI(): Promise<INMETDataRaw> {
  try {
    const response = await fetch(`${API_URL}/get-data-inmet-free`);

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
