const API_URL = import.meta.env.VITE_API_URL

interface CPTECImage {
  INPE: string[];
  CPPMET: string[];

}
export async function DataCPTECAPI(): Promise<CPTECImage> {
  try {
    const response = await fetch(`${API_URL}/cptec-images`);

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
