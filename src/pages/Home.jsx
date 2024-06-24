import { DataINMETAPI } from "../services/inmet.js";
import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MenuMap } from "../components/menuMap/menuMap.jsx";
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
import { useNavigate } from 'react-router-dom';

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
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [showWindy, setShowWindy] = useState(false);
  const navigate = useNavigate();

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

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const showWindyComponent = () => {
    setIsMenuVisible(!isMenuVisible);
    setShowWindy(!showWindy);

    if (!showWindy) {
      document.getElementById("windy").style.bottom = "50%";
      navigate('/windy');
    } else {
      document.getElementById("windy").style.bottom = "37%";
      navigate('/');
    }
  };

  return (
    <>
      <main
        className={`${styles.container} ${
          !isMenuVisible ? styles.fullWidth : ""
        }`}
      >
        <section
          className={`${styles.menu_map} ${
            !isMenuVisible ? styles.hidden : ""
          }`}
        >
          <HourScopeProvider>
            <MenuMap selectImage={handleSelectImage} ref={containerRef} />
          </HourScopeProvider>
        </section>
        <Player
          playGif={playImages}
          onClick={handlerSrcFunc}
          pauseGif={pauseGif}
          nextImage={nextImage}
          previousImage={previousImage}
        />

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
        <section>{location.pathname === "/satelite" && <Satellite />}</section>
        <DownloadGif disabledButton={disabledButton} />
      </main>
      <button className={styles.toggleBtn} onClick={toggleMenuVisibility}>
        Menu
      </button>
      <section>{location.pathname === '/windy' && <Windy />}</section>
      <button id="windy" className={styles.windy} onClick={showWindyComponent}>
        Windy
      </button>
    </>
  );
}
