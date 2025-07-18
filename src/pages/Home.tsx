import { DataINMETAPI } from "../services/inmet";
import { INMETDataRaw } from "../interfaces/Station";
import { RedemetImages, RadarImageEntry } from "../interfaces/RadarImageSet";
import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import MenuMap from "../components/menuMap/menuMap";
//import { Player } from "../components/player/player.js";
import {
  HourScopeProvider,
  //useHourScope,
  //useHourScopeSatelite,
} from "../contexts/hourAnimation.jsx";
import { UseRadarIsChecked } from "../contexts/radarIsChecked.jsx";
import { UsePreviousAndNextImage } from "../contexts/previousAndNextImage.jsx";
//import { useFilterTypeRadarContext } from "../contexts/typeRadarContext.js";
//import { WrfImageContext } from "../contexts/WrfImage.jsx";
import { Map } from "../components/map/Map.js";
import styles from "./styles/Home.module.css";
import { DownloadGif } from "../components/download/gif.jsx";
import Satellite from "./Sattelite";
import Estacao from "./Estacao";
import Sobre from "./Sobre.jsx";
import Boletins from "./Boletins.jsx";
//import WRF from "./WRF.jsx";
import { Link } from "react-router-dom";
import { GiSattelite } from "react-icons/gi";
import { RiBaseStationLine } from "react-icons/ri";
import Profile from "./Profile";
import MenuPrincipal from "../components/menuPrincipal/menuPrincipal";
//import { useAuth } from "../contexts/AuthContext";
//import { useWrfImageProvider } from "../contexts/WrfImage.jsx";

export default function Home() {
  const userSelect = Number(localStorage.getItem("hourScopeRadar") ?? "0");
  //const { isAuthenticated, enterSemLogin } = useAuth();
  const [handlerSrc, setHandlerSrc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(23);
  const [images, setImages] = useState<RadarImageEntry[]>([]);
  //const [count, setCount] = useState(24 - userSelect);
  const { cangucuChecked, morroDaIgrejaChecked, santiagoChecked } =
    UseRadarIsChecked();
  const { indexImage, handleNextImage, handlePreviousImage } =
    UsePreviousAndNextImage();
  //const { getHourScopeRadar } = useHourScope();
  //const { getHourScopeSatelite } = useHourScopeSatelite();
  //const { typeRadar } = useFilterTypeRadarContext();
  const [dataINMET, setDataINMET] = useState<INMETDataRaw>({});
  const [disabledButton, setDisabledButton] = useState(false);
  const containerRef = useRef(null);
  const [isMenuVisible] = useState(false);
  //const { selectedWrfImage, setSelectedWrfImage } = useWrfImageProvider();

  const handlerSrcFunc = () => {
    if (handlerSrc === false) {
      setHandlerSrc(true);
    } else {
      setHandlerSrc(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataINMET = await DataINMETAPI();
        setDataINMET(dataINMET);
      } catch (error) {
        console.error("Erro ao obter informações do radar:", error);
      }
    };

    fetchData();
  }, []);

  /*const playImages = async () => {
    const raw = localStorage.getItem("redemet-images");

    if (!raw) {
      console.warn(
        "Nenhum dado encontrado no localStorage para 'redemet-images'"
      );
      return;
    }

    try {
      const parsed = JSON.parse(raw) as RedemetImages;
      const selectedRadarImages = parsed[typeRadar];
    

      if (!Array.isArray(selectedRadarImages)) {
        console.error(`Dados inválidos para o radar: ${typeRadar}`);
        return;
      }

      setImages(selectedRadarImages);
      setDisabledButton(true);
      handlerSrcFunc();

      let incrementCount = 0;
      let currentIndex = 24 - userSelect;


      const intervalId = setInterval(() => {
        setCurrentImageIndex(currentIndex);
        if (incrementCount < userSelect) {
          incrementCount += 1;
          currentIndex += 1;
          if (currentIndex === 24) {
            clearInterval(intervalId);
          }
        }
      }, 400);
    } catch (e) {
      console.error("Erro ao parsear redemet-images:", e);
    }
  };*/

  /*const pauseGif = () => {
    setHandlerSrc(false);
    setCurrentImageIndex(0);
    setDisabledButton(false);
  };*/

  /*const nextImage = () => {
    handleNextImage(count);
    setCount(count + 1);

    if (count === 23) {
      setCount(24 - userSelect);
    }
    localStorage.setItem("imageId", count.toString());
    setCurrentImageIndex(count); //GATILHO PARA MUDANÇA DE IMAGEM
  };*/

  /*const previousImage = () => {
    handlePreviousImage(count);

    if (count <= 24 - userSelect) {
      setCount(23);
    } else {
      setCount(count - 1);
      setCurrentImageIndex(count - 1); ///GATILHO PARA MUDANÇA DE IMAGEM
    }
  };*/

  const handleSelectImage = () => {
    setCurrentImageIndex(indexImage + 1);
  };

  const renderLinkBasedOnPath = (pathname) => {
    switch (pathname) {
      case "/produtos/satelite":
        return (
          <Link to="/produtos/satelite">
            <span className="icon is-small">
              <GiSattelite className={styles.Icon} />
            </span>
            <span>Satélite</span>
          </Link>
        );
      case "/produtos/estacoes":
        return (
          <Link to="/produtos/estacoes">
            <span className="icon is-small">
              <RiBaseStationLine className={styles.Icon} />
            </span>
            <span>Estações</span>
          </Link>
        );
      default:
        return null;
    }
  };

  const hideItFrom =
    !isMenuVisible &&
    location.pathname !== "/" &&
    location.pathname !== "/boletins" &&
    location.pathname !== "/profile" &&
    location.pathname !== "/sobre";

  const dontHideItFrom =
    location.pathname === "/produtos/estacoes" ||
    location.pathname === "/produtos/radar" ||
    location.pathname === "/produtos/satelite"; //||
    //location.pathname === "/produtos/wrf";

  return (
    <>
      {<MenuPrincipal id="menu" className="is-fixed-top" />}
      <main className={`${styles.container}`}>
        <section
          className={`${styles.menu_map} ${
            isMenuVisible || dontHideItFrom ? styles.visible : styles.hidden
          }`}
        >
          <HourScopeProvider>
            <MenuMap selectImage={handleSelectImage} ref={containerRef} />
          </HourScopeProvider>
        </section>
        {/*location.pathname !== "/produtos/wrf" &&*/}
        {hideItFrom &&
          location.pathname !== "/produtos/radar" &&
          location.pathname !== "/produtos/estacoes" &&
          location.pathname !== "/produtos/satelite" &&
           (
            <button className={styles.btnMenu}>
              {renderLinkBasedOnPath(location.pathname)}
            </button>
          )}

        {location.pathname === "/produtos/satelite" && (
          <section className={`${isMenuVisible ? styles.centerSat : ""}`}>
            <Satellite />
          </section>
        )}

        {location.pathname === "/produtos/radar" && (
          <section className={styles.map}>
            <Map
              cangucuChecked={cangucuChecked}
              santiagoChecked={santiagoChecked}
              morroDaIgrejaChecked={morroDaIgrejaChecked}
              handlerSrc={handlerSrc}
              images={images}
              currentImageIndex={currentImageIndex}
            />
          </section>
        )}

        {/*location.pathname === "/produtos/wrf" && (
          <section>
            <WRF
              selectedImage={selectedWrfImage}
              setSelectedImage={setSelectedWrfImage}
            />
          </section>
        )*/}
        {location.pathname === "/produtos/estacoes" && <Estacao />}
        {location.pathname === "/boletins" && <Boletins />}
        {location.pathname === "/profile" && <Profile />}
        {location.pathname === "/sobre" && <Sobre />}
      </main>

      <DownloadGif disabledButton={disabledButton} />
    </>
  );
}
