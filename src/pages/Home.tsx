import { DataINMETAPI } from "../services/inmet";
import { INMETDataRaw } from "../interfaces/Station";
import { RadarImageEntry } from "../interfaces/RadarImageSet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import MenuMap from "../components/menuMap/menuMap";
import { UseRadarIsChecked } from "../contexts/radarIsChecked.jsx";
import { Map } from "../components/map/Map.js";
import styles from "./styles/Home.module.css";
import Satellite from "./Sattelite";
import Estacao from "./Estacao";
import Sobre from "./Sobre.jsx";
import Boletins from "./Boletins";
import WrfPage from "./Wrf";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import MenuPrincipal from "../components/menuPrincipal/menuPrincipal";
import { useHourScope } from "../contexts/hourAnimation";

export default function Home() {
  const location = useLocation();
  const { getHourScopeRadar } = useHourScope();
  const TOTAL_RADAR_FRAMES = 144;
  const nowUtc = new Date();
  const frontTrimButtons = 2; // -20 min à frente
  const totalButtons = Math.max(1, getHourScopeRadar * 6);
  const currentUtcIndex =
    (nowUtc.getUTCHours() * 6 + Math.floor(nowUtc.getUTCMinutes() / 10)) %
    TOTAL_RADAR_FRAMES;
  const adjustedCurrentIndex =
    (currentUtcIndex - frontTrimButtons + TOTAL_RADAR_FRAMES) %
    TOTAL_RADAR_FRAMES;
  const startIndex =
    (adjustedCurrentIndex - (totalButtons - 1) + TOTAL_RADAR_FRAMES) %
    TOTAL_RADAR_FRAMES;
  const hourScopeIndexes = Array.from(
    { length: totalButtons },
    (_, i) => (startIndex + i) % TOTAL_RADAR_FRAMES,
  );

  const stepIndexInScope = (index: number, step: 1 | -1): number => {
    const normalizedIndex =
      ((index % TOTAL_RADAR_FRAMES) + TOTAL_RADAR_FRAMES) % TOTAL_RADAR_FRAMES;
    const currentPosition = hourScopeIndexes.indexOf(normalizedIndex);

    if (currentPosition === -1) {
      return hourScopeIndexes[hourScopeIndexes.length - 1];
    }

    const nextPosition =
      (currentPosition + step + hourScopeIndexes.length) %
      hourScopeIndexes.length;
    return hourScopeIndexes[nextPosition];
  };

  const defaultLastAvailableChipIndex =
    hourScopeIndexes[hourScopeIndexes.length - 1];
  const rawRedemet = localStorage.getItem("redemet-images") ?? "null";
  let redemetData = null;
  try {
    redemetData = JSON.parse(rawRedemet); // pode ser null
  } catch (e) {
    console.error("Erro ao fazer parse de redemet-images:", e);
    redemetData = null;
  }

  const normalizedLastIndex = defaultLastAvailableChipIndex;
  const [handlerSrc, setHandlerSrc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] =
    useState<number>(normalizedLastIndex);
  const [images, setImages] = useState<RadarImageEntry[]>([]);
  const { cangucuChecked, morroDaIgrejaChecked, santiagoChecked } =
    UseRadarIsChecked();
  const [dataINMET, setDataINMET] = useState<INMETDataRaw>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeedMs, setPlaybackSpeedMs] = useState(1200);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > 900 : false,
  );
  const [isDrawerPinned, setIsDrawerPinned] = useState(false);
  const isProductsArea = ["/", "/satelite", "/estacoes", "/wrf"].includes(
    location.pathname,
  );
  const isPinnedDesktop = isDesktop && isDrawerPinned;
  const isDrawerVisible = isDrawerOpen || isPinnedDesktop;

  const getMaxRadarFrames = (data: unknown): number => {
    if (!data || typeof data !== "object") return 0;
    let maxLen = 0;

    const walk = (value: unknown) => {
      if (Array.isArray(value)) {
        maxLen = Math.max(maxLen, value.length);
        return;
      }

      if (value && typeof value === "object") {
        Object.values(value).forEach(walk);
      }
    };

    walk(data);
    return maxLen;
  };

  const maxFrames = getMaxRadarFrames(redemetData);

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

  useEffect(() => {
    if (!isProductsArea) {
      setIsDrawerOpen(false);
      setIsPlaying(false);
    }
  }, [isProductsArea]);

  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isDesktop && isDrawerPinned) {
      setIsDrawerPinned(false);
    }
  }, [isDesktop, isDrawerPinned]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setCurrentImageIndex((prev) => stepIndexInScope(prev, 1));
    }, playbackSpeedMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, playbackSpeedMs, totalButtons, startIndex]);

  useEffect(() => {
    if (currentImageIndex < 0 || currentImageIndex >= TOTAL_RADAR_FRAMES) {
      setCurrentImageIndex(
        ((currentImageIndex % TOTAL_RADAR_FRAMES) + TOTAL_RADAR_FRAMES) %
          TOTAL_RADAR_FRAMES,
      );
      return;
    }

    if (!hourScopeIndexes.includes(currentImageIndex)) {
      setCurrentImageIndex(hourScopeIndexes[hourScopeIndexes.length - 1]);
    }
  }, [maxFrames, currentImageIndex, totalButtons, startIndex]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => stepIndexInScope(prev, 1));
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => stepIndexInScope(prev, -1));
  };

  const handleSelectImage = (index: number) => {
    setIsPlaying(false);
    setCurrentImageIndex(index);
  };

  return (
    <>
      {<MenuPrincipal />}
      <main className={`${styles.container}`}>
        {isProductsArea && (
          <>
            {!isPinnedDesktop && (
              <button
                className={`${styles.hamburgerButton} ${
                  isDrawerVisible ? styles.hamburgerButtonOpen : ""
                }`}
                onClick={() => setIsDrawerOpen((prev) => !prev)}
                aria-label="Abrir ou fechar menu de produtos"
                aria-expanded={isDrawerVisible}
              >
                <HiOutlineMenuAlt3 size={22} />
              </button>
            )}

            {isDrawerOpen && !isPinnedDesktop && (
              <button
                className={styles.drawerBackdrop}
                aria-label="Fechar menu"
                onClick={() => setIsDrawerOpen(false)}
              />
            )}

            <aside
              className={`${styles.menuDrawer} ${
                isDrawerVisible ? styles.drawerOpen : styles.drawerClosed
              }`}
            >
              {isDesktop && (
                <label className={styles.pinToggle}>
                  <input
                    type="checkbox"
                    checked={isDrawerPinned}
                    onChange={(e) => setIsDrawerPinned(e.target.checked)}
                  />
                  <span>Fixar menu</span>
                </label>
              )}
              <MenuMap
                selectImage={handleSelectImage}
                currentImageIndex={currentImageIndex}
              />
            </aside>
          </>
        )}

        {location.pathname === "/satelite" && (
          <section className={styles.map}>
            <Satellite />
          </section>
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
              isPlaying={isPlaying}
              onTogglePlaying={() => setIsPlaying((prev) => !prev)}
              onPreviousImage={handlePreviousImage}
              onNextImage={handleNextImage}
              playbackSpeedMs={playbackSpeedMs}
              onPlaybackSpeedChange={setPlaybackSpeedMs}
            />
          </section>
        )}

        {location.pathname === "/estacoes" && <Estacao />}
        {location.pathname === "/boletins" && <Boletins />}
        {location.pathname === "/sobre" && <Sobre />}
        {location.pathname === "/wrf" && <WrfPage />}
      </main>
    </>
  );
}
