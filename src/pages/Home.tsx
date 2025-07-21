import { DataINMETAPI } from "../services/inmet";
import { INMETDataRaw } from "../interfaces/Station";
import { RadarImageEntry } from "../interfaces/RadarImageSet";
import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import MenuMap from "../components/menuMap/menuMap";
import { UseRadarIsChecked } from "../contexts/radarIsChecked.jsx";
import { UsePreviousAndNextImage } from "../contexts/previousAndNextImage.jsx";
import { Map } from "../components/map/Map.js";
import styles from "./styles/Home.module.css";
import Satellite from "./Sattelite";
import Estacao from "./Estacao";
import Sobre from "./Sobre.jsx";
import Boletins from "./Boletins.jsx";
import { Link } from "react-router-dom";
import { GiSattelite } from "react-icons/gi";
import { RiBaseStationLine } from "react-icons/ri";
import MenuPrincipal from "../components/menuPrincipal/menuPrincipal";

export default function Home() {
  const [handlerSrc, setHandlerSrc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(23);
  const [images, setImages] = useState<RadarImageEntry[]>([]);
  const { cangucuChecked, morroDaIgrejaChecked, santiagoChecked } =
    UseRadarIsChecked();
  const { indexImage } = UsePreviousAndNextImage();
  const [dataINMET, setDataINMET] = useState<INMETDataRaw>({});

  const containerRef = useRef(null);
  const [isMenuVisible] = useState(false);

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
    location.pathname === "/produtos/satelite";

  return (
    <>
      {<MenuPrincipal id="menu" className="is-fixed-top" />}
      <main className={`${styles.container}`}>
        <section
          className={`${styles.menu_map} ${
            isMenuVisible || dontHideItFrom ? styles.visible : styles.hidden
          }`}
        >
          <MenuMap selectImage={handleSelectImage} ref={containerRef} />
        </section>
        {/*location.pathname !== "/produtos/wrf" &&*/}
        {hideItFrom &&
          location.pathname !== "/produtos/radar" &&
          location.pathname !== "/produtos/estacoes" &&
          location.pathname !== "/produtos/satelite" && (
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

        {location.pathname === "/produtos/estacoes" && <Estacao />}
        {location.pathname === "/boletins" && <Boletins />}
        {location.pathname === "/sobre" && <Sobre />}
      </main>
    </>
  );
}
