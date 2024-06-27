import { DataINMETAPI } from "../services/inmet.js";
import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import MenuMap  from "../components/menuMap/menuMap.tsx";
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
import { Map } from "../components/map/Map.jsx";
import styles from "./styles/Home.module.css";
import { DownloadGif } from "../components/download/gif.jsx";
import Satellite from "./Sattelite.jsx";
import Windy from "./Windy.jsx";
import Estacao from "./Estacao.jsx";
import { Link } from 'react-router-dom';
import { GiRadarSweep, GiSattelite } from 'react-icons/gi';
import { RiBaseStationLine } from 'react-icons/ri';

export default function Home() {
  const [handlerSrc, setHandlerSrc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(0);
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
    const images = await getImages(typeRadar);
    setImages(images);

    setDisabledButton(true);

    let currentIndex = 0; // Use o índice atual de imagem como ponto de partida
    handlerSrcFunc();

    const intervalId = setInterval(() => {
      setCurrentImageIndex(currentIndex);
      currentIndex = (currentIndex + 1) % images.length;
      if (currentIndex === currentImageIndex) {
        clearInterval(intervalId);
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

    if (count >= images.length - 2) {
      setCount(0);
    }
    localStorage.setItem("imageId", count);
    setCurrentImageIndex(count); //GATILHO PARA MUDANÇA DE IMAGEM
  };

  const previousImage = () => {
    handlePreviousImage(count);
    if (count <= 0) {
      setCount(getHourScopeRadar);
      setCount(getHourScopeSatelite);
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
      case "/":
        return (
          <Link to="/">
            <span className="icon is-small">
              <GiRadarSweep />
            </span>
            <span>Radar</span>
          </Link>
        );
      case "/satelite":
        return (
          <Link to="/satelite">
            <span className="icon is-small">
              <GiSattelite className={styles.Icon} />
            </span>
            <span>Satélite</span>
          </Link>
        );
      case "/estacoes":
        return (
          <Link to="/estacoes">
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
  
  return (
    <>
      <main className={`${styles.container}`}>
        <section
          className={`${styles.menu_map} ${isMenuVisible ? styles.visible : styles.hidden}`}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeaveMenu}
        >
          <HourScopeProvider>
            <MenuMap selectImage={handleSelectImage} ref={containerRef} />
          </HourScopeProvider>
        </section>

        {!isMenuVisible && (
          <button
            className={styles.btnMenu}
            onMouseOver={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveButton}
          >
            {renderLinkBasedOnPath(location.pathname)}
          </button>
        )}

        {location.pathname === "/" && (
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

        {location.pathname === "/satelite" && <Satellite />}
        {location.pathname === '/estacoes' && <Estacao />}

      </main>
      <section>{location.pathname === '/windy' && <Windy />}</section>

      <Player
          playGif={playImages}
          onClick={handlerSrcFunc}
          pauseGif={pauseGif}
          nextImage={nextImage}
          previousImage={previousImage}
        />

        <DownloadGif disabledButton={disabledButton} />
    </>
  );
}
