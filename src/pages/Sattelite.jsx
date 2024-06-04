import { useState } from "react";
import { MenuSatelite } from "../components/menuSatelite/MenuSatelite.jsx";
import { CPPMETImages } from "../services/cpmetUFPEL.js";
//import { MapContainer, TileLayer, ImageOverlay} from "react-leaflet";
//import { getImagesFromSatellite } from "../services/sattelite.js";
//import { divIcon } from "leaflet";


export default function Satellite() {
  const imagesCPP = CPPMETImages();
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState()

  setInterval(()=>{
    if(index > imagesCPP.length){
      setIndex(0)
      setImage(imagesCPP[0])
    }
    setIndex(index+1)
    setImage(imagesCPP[index])
  },10000)

  console.log(index)
/*  const bounds = [
    [-56, -100],
    [12.52, -25.24],
  ];
  const [imageRealcada, setImageRealcada] = useState("");
  const [imageVis, setImageVis] = useState("");
  const [imageIr, setImageIr] = useState("");
  const [selectedOption, setSelectedOption] = useState("realçada");

  console.log(typeof date)
  const handleSelectedOptionChange = (newOption) => {
    setSelectedOption(newOption);
  };
  

  useEffect(() => {
    const data = async () => {
      try {
        const images = await getImagesFromSatellite();
        const { dataRealcada, dataVis, dataIr } = images;

        console.log("real", dataRealcada.data.satelite[0].path);
        setImageRealcada(dataRealcada.data.satelite[0].path);
        setImageVis(dataVis.data.satelite[0].path);
        setImageIr(dataIr.data.satelite[0].path);
        console.log(images);
      } catch (error) {
        console.error("Erro ao obter a imagem do satélite:", error);
      }
    };
    data();
  }, []);*/
   
  return (
    <>
      <MenuSatelite
        /*selectedOption={selectedOption}
        onOptionChange={handleSelectedOptionChange}*/
      />
     
      <div>
        <img src={image}/>
      </div>



      {/*<MapContainer
        center={[-28.128373, -49.471816]}
        zoom={4}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "90vh" }}
      >
        {selectedOption === "realçada" ? (
          <ImageOverlay bounds={bounds} url={imageRealcada} />
        ) : selectedOption === "vis" ? (
          <ImageOverlay bounds={bounds} url={imageVis} />
        ) : selectedOption === "ir" ? (
          <ImageOverlay bounds={bounds} url={imageIr} />
        ) : (
          // Padrão para outras condições não tratadas
          <ImageOverlay bounds={bounds} url={imageRealcada} />
        )}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>*/}
    </>
  );
}
