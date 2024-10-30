import { controlDataRadar } from "../utils/controlDataRadar.js";

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
      localStorage.setItem("redemet-images-maxcappi-mi", JSON.stringify(controlDataRadar(data.data,'maxcappi','morroDaIgreja')))
      localStorage.setItem("redemet-images-maxcappi-sg", JSON.stringify(controlDataRadar(data.data,'maxcappi','santiago')))
      localStorage.setItem("redemet-images-maxcappi-cn", JSON.stringify(controlDataRadar(data.data,'maxcappi','cangucu')))

      localStorage.setItem("redemet-images-07km-mi", JSON.stringify(controlDataRadar(data.data,'07km','morroDaIgreja')))
      localStorage.setItem("redemet-images-07km-sg", JSON.stringify(controlDataRadar(data.data,'07km','santiago')))
      localStorage.setItem("redemet-images-07km-cn", JSON.stringify(controlDataRadar(data.data,'07km','cangucu')))

      localStorage.setItem("redemet-images-10km-mi", JSON.stringify(controlDataRadar(data.data,'10km','morroDaIgreja')))
      localStorage.setItem("redemet-images-10km-sg", JSON.stringify(controlDataRadar(data.data,'10km','santiago')))
      localStorage.setItem("redemet-images-10km-cn", JSON.stringify(controlDataRadar(data.data,'10km','cangucu')))

      localStorage.setItem("redemet-images-07km-mi", JSON.stringify(controlDataRadar(data.data,'07km','morroDaIgreja')))
      localStorage.setItem("redemet-images-07km-sg", JSON.stringify(controlDataRadar(data.data,'07km','santiago')))
      localStorage.setItem("redemet-images-07km-cn", JSON.stringify(controlDataRadar(data.data,'07km','cangucu')))

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
  console.log('atualizado')
}

setupWebSocket();

