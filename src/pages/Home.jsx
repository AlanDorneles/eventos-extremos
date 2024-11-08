import { DataINMETAPI } from "../services/inmet.js";
import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import MenuMap from "../components/menuMap/menuMap.tsx";
import { Player } from "../components/player/player.jsx";
import {
  HourScopeProvider,
  useHourScope,
  useHourScopeSatelite,
} from "../contexts/hourAnimation.jsx";
import { getImages } from "../services/images.js";
import { UseRadarIsChecked } from "../contexts/radarIsChecked.jsx";
import { UsePreviousAndNextImage } from "../contexts/previousAndNextImage.jsx";
import { useFilterTypeRadarContext } from "../contexts/typeRadar.jsx";
import { WrfImageContext } from "../contexts/WrfImage";
import { Map } from "../components/map/Map.jsx";
import styles from "./styles/Home.module.css";
import { DownloadGif } from "../components/download/gif.jsx";
import Satellite from "./Sattelite.jsx";
import Estacao from "./Estacao.tsx";
import Sobre from "./Sobre.jsx";
import Boletins from "./Boletins.jsx";
import WRF from "./WRF.jsx";
import { Link } from "react-router-dom";
import { GiSattelite } from "react-icons/gi";
import { RiBaseStationLine } from "react-icons/ri";
import Profile from "./Profile.tsx";
import MenuPrincipal from "../components/menuPrincipal/menuPrincipal.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function Home() {
  const userSelect = localStorage.getItem("hourScopeRadar");
  const { isAuthenticated, enterSemLogin } = useAuth();
  const [handlerSrc, setHandlerSrc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(23);
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(24 - userSelect);
  const { cangucuChecked, morroDaIgrejaChecked, santiagoChecked } =
    UseRadarIsChecked();
  const { indexImage, handleNextImage, handlePreviousImage } =
    UsePreviousAndNextImage();
  const { getHourScopeRadar } = useHourScope();
  const { getHourScopeSatelite } = useHourScopeSatelite();
  const { typeRadar } = useFilterTypeRadarContext();
  const [dataINMET, setDataINMET] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const containerRef = useRef(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const { selectedImage, setSelectedImage } = React.useContext(WrfImageContext);

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

  const playImages = async () => {
    const images = JSON.parse(localStorage.getItem("redemet-images"));
    setImages(images);
    setDisabledButton(true);
    let incrementCount = 0;
    let currentIndex = 24 - userSelect; // Use o índice atual de imagem como ponto de partida
    handlerSrcFunc();
    const intervalId = setInterval(() => {
      setCurrentImageIndex(currentIndex);
      if (incrementCount < userSelect) {
        incrementCount += 1;
        currentIndex += 1;
        if (currentIndex === 23) {
          clearInterval(intervalId);
        }
      }
    }, 400);
  };

  const pauseGif = () => {
    setHandlerSrc(false);
    setCurrentImageIndex(0);
    setDisabledButton(false);
  };

  const nextImage = () => {
    handleNextImage(count);
    setCount(count + 1);

    if (count === 23) {
      setCount(24 - userSelect);
    }
    localStorage.setItem("imageId", count);
    setCurrentImageIndex(count); //GATILHO PARA MUDANÇA DE IMAGEM
  };

  const previousImage = () => {
    handlePreviousImage(count);

    if (count <= 24 - userSelect) {
      setCount(23);
    } else {
      setCount(count - 1);
      setCurrentImageIndex(count - 1); ///GATILHO PARA MUDANÇA DE IMAGEM
    }
  };

  const handleSelectImage = () => {
    setCurrentImageIndex(indexImage + 1);
  };

  const handleMouseEnterButton = () => {
    setIsMenuVisible(true);
    setIsMouseOver(true);
  };

  const handleMouseLeaveButton = () => {
    setIsMouseOver(false);
    setTimeout(() => {
      if (!isMouseOver) {
        setIsMenuVisible(false);
      }
    }, 100);
  };

  const handleMouseEnterMenu = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeaveMenu = () => {
    setIsMouseOver(false);
    setIsMenuVisible(false);
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
    location.pathname === "/produtos/satelite" ||
    location.pathname === "/produtos/wrf";

  return (
    <>
      {<MenuPrincipal id="menu" className="is-fixed-top" />}
      <main className={`${styles.container}`}>
        <section
          className={`${styles.menu_map} ${
            isMenuVisible || dontHideItFrom ? styles.visible : styles.hidden
          }`}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
        >
          <HourScopeProvider>
            <MenuMap selectImage={handleSelectImage} ref={containerRef} />
          </HourScopeProvider>
        </section>

        {hideItFrom &&
          location.pathname !== "/produtos/radar" &&
          location.pathname !== "/produtos/estacoes" &&
          location.pathname !== "/produtos/satelite" &&
          location.pathname !== "/produtos/wrf" && (
            <button
              className={styles.btnMenu}
              onMouseOver={handleMouseEnterButton}
              onMouseLeave={handleMouseLeaveButton}
            >
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

        {location.pathname === "/produtos/wrf" && (
          <section>
            <WRF
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </section>
        )}
        {location.pathname === "/produtos/estacoes" && <Estacao />}
        {location.pathname === "/boletins" && <Boletins />}
        {location.pathname === "/profile" && <Profile />}
        {location.pathname === "/sobre" && <Sobre />}
      </main>

      {hideItFrom &&
        location.pathname !== "/produtos/satelite" &&
        location.pathname !== "/produtos/estacoes" &&
        location.pathname !== "/produtos/wrf" && (
          <Player
            playGif={playImages}
            onClick={handlerSrcFunc}
            pauseGif={pauseGif}
            nextImage={nextImage}
            previousImage={previousImage}
          />
        )}
      <DownloadGif disabledButton={disabledButton} />
    </>
  );
}
