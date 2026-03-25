export type WrfVar = "VENTO_10M" | "PRECIPITACAO" | "VENTO_LEVELS_200HPA" | "VENTO_LEVELS_500HPA" | "UMIDADE_2M";

type ApiResp = {
  data: any;
  message: string;
  variable: WrfVar;
  folder: string;
  latestFolder: string;
  count: number;
  files: string[];
};

export async function getWrfImages(params: {
  apiUrl: string;
  variable: WrfVar;
  publicBase?: string;
}) {
  const { apiUrl, variable, publicBase = "https://liao.furg.br" } = params;

  const res = await fetch(`${apiUrl}/get-wrf-images/${variable}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const ct = res.headers.get("content-type") || "";
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (!ct.includes("application/json")) {
    const t = await res.text();
    throw new Error(`Resposta não-JSON (${ct}). Início: ${t.slice(0, 40)}`);
  }

  const json: ApiResp = await res.json();

  console.log("getWrfImages response:", json);

  const list = json.data.files.map(
    (f) => `${publicBase}${f}`,
  );

  console.log("imageslist:", list);

  return { list, latestFolder: json.data.latestFolder, serverVar: json.variable };
}


