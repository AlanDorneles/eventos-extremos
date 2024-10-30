import React from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Pane,
  ImageOverlay,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { customMarkerIcon, iconStation } from "../marker/marker";
import { circleOptions } from "../../constants/constants";
import { useState, useEffect } from "react";
import { useStationsVisible } from "../../contexts/radarFilter";
import { useCodeStation } from "../../contexts/codeStation";
import { bounds, radius } from "../../constants/bounds";
import { Phenomena } from "../phenomena/Phenomena";
import { useFilterTypeRadarContext } from "../../contexts/typeRadar";
import { LeafletEvent } from "leaflet";
import MapProps from "../../interfaces/Map";

export const Map: React.FC<MapProps> = ({
  cangucuChecked,
  santiagoChecked,
  morroDaIgrejaChecked,
  handlerSrc,
  images,
  currentImageIndex,
}) => {
  const { typeRadar } = useFilterTypeRadarContext();
  const [clicked, setClicked] = useState<boolean>(false);
  const { setCodeStation } = useCodeStation();
  const { stationsVisible } = useStationsVisible();
  const [morroDaIgreja, setMorroDaIgreja] = useState<string | null>(null);
  const [cangucu, setCangucu] = useState<string | null>(null);
  const [santiago, setSantiago] = useState<string | null>(null);
  const [radiusRadar, setRadiusRadar] = useState<number>(radius[0]);

  const handleCloseModal = () => {
    setClicked(false);
  };

  useEffect(() => {
    if (typeRadar !== "maxcappi") {
      setRadiusRadar(radius[1]);
    } else {
      setRadiusRadar(radius[0]);
    }
  }, [typeRadar]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const radarInformation = JSON.parse(
          localStorage.getItem("redemet-images") || "{}"
        );
        setMorroDaIgreja(radarInformation[typeRadar]?.morroDaIgreja || null);
        setCangucu(radarInformation[typeRadar]?.cangucu || null);
        setSantiago(radarInformation[typeRadar]?.santiago || null);
      } catch (error) {
        console.error("Erro ao obter informações do radar:", error);
      }
    };

    fetchData();
  }, [typeRadar]);

  const handleClickModal = () => {
    setClicked(true);
  };

  const handleClickMarker = (event: LeafletEvent) => {
    const id = event.target.options.id;
    setCodeStation(id);
    handleClickModal();
  };

  return (
    <>
      <MapContainer
        center={[-30, -49.471816]}
        zoom={6.5}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "100vh" }}
      >
        {/*<Rectangle bounds={ [
    [-29.15, -55.36],
    [-33.7, -50.05],
  ]} pathOptions={{ color: 'red' }}/>*/}
        {cangucuChecked ? (
          <Pane style={{ zIndex: 500 }} name="overlay-pane-1">
            <Circle
              center={[-31.404, -52.701644]}
              pathOptions={circleOptions}
              radius={radiusRadar}
            />
          </Pane>
        ) : null}
        {/*<Rectangle bounds={[
    [-25.87, -52.05],
    [-30.4, -46.9],
  ]} pathOptions={{ color: 'black' }}/>*/}
        {morroDaIgrejaChecked ? (
          <Pane style={{ zIndex: 500 }} name="overlay-pane-2">
            <Circle
              center={[-28.128373, -49.471816]}
              pathOptions={circleOptions}
              radius={radiusRadar}
            />
          </Pane>
        ) : null}
        {/*<Rectangle bounds={ [
    [-26.95, -57.55],
    [-31.5, -52.35],
  ]} pathOptions={{ color: 'green' }}/>*/}
        {santiagoChecked ? (
          <Pane style={{ zIndex: 500 }} name="overlay-pane-3">
            <Circle
              center={[-29.225213, -54.930257]}
              pathOptions={circleOptions}
              radius={radiusRadar}
            />
          </Pane>
        ) : null}

        {stationsVisible == false ? (
          <>
            <Marker
              position={[-33.74, -53.37]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>{" "}
            {/* CHUÍ */}
            <Marker
              position={[-29.7, -53.68]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>{" "}
            {/* SANTA MARIA */}
            <Marker
              position={[-29.84, -57.08]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>{" "}
            {/*URUGUAIANA */}
            <Marker
              position={[-32.08, -52.17]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* RIO GRANDE */}
            <Marker
              position={[-32.53, -53.38]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* JAGUARÃO */}
            <Marker
              position={[-31.96, -53.49]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* HERVAL */}
            <Marker
              position={[-31.8, -52.51]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* PELOTAS */}
            <Marker
              position={[-31.67, -53.1]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* PIRATINI */}
            <Marker
              position={[-31.5, -53.51]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* PINHEIRO MACHADO */}
            <Marker
              position={[-31.39, -53.93]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* HULHA NEGRA */}
            <Marker
              position={[-31.35, -54.01]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* BAGÉ*/}
            <Marker
              position={[-31.0, -54.62]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* DOM PEDRITO*/}
            <Marker
              position={[-30.75, -55.4]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SANTANA DO LIVRAMENTO*/}
            <Marker
              position={[-29.16, -56.55]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* ITAQUI*/}
            <Marker
              position={[-29.21, -56.35]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* ITAQUI VMAER*/}
            <Marker
              position={[-29.13, -56.02]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* MACAMBARÁ*/}
            <Marker
              position={[-29.71, -55.53]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* ALEGRETE*/}
            <Marker
              position={[-30.26, -54.84]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* ROSÁRIO DO SUL*/}
            <Marker
              position={[-30.34, -54.31]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO GABRIEL*/}
            <Marker
              position={[-30.34, -54.26]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO GABRIEL*/}
            <Marker
              position={[-30.72, -53.96]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* LAVRAS DO SUL*/}
            <Marker
              position={[-30.9, -53.43]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CAÇAPAVA DO SUL (MINAS DO CAMAQUÃ)*/}
            <Marker
              position={[-30.94, -52.74]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CANGUÇU OLIVAL CAPOLIVO*/}
            <Marker
              position={[-31.4, -52.7]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CANGUÇU*/}
            <Marker
              position={[-31.36, -52.27]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO LOURENÇO DO SUL*/}
            <Marker
              position={[-30.81, -51.83]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CAMAQUÃ*/}
            <Marker
              position={[-30.57, -51.53]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* BARRA DO RIBEIRO*/}
            <Marker
              position={[-30.55, -52.41]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* ENCRUZILHADA DO SUL*/}
            <Marker
              position={[-30.55, -53.47]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CAÇAPAVA DO SUL*/}
            <Marker
              position={[-30.41, -53.45]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CAÇAPAVA DO SUL (COSTI OLIVOS)*/}
            <Marker
              position={[-30.37, -53.51]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO SEPÉ*/}
            <Marker
              position={[-29.19, -54.89]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SANTIAGO*/}
            <Marker
              position={[-29.48, -54.73]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* JAGUARI ( MIRANTE MINUZZI)*/}
            <Marker
              position={[-29.7, -54.69]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO VICENTE DO SUL*/}
            <Marker
              position={[-30.22, -52.94]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CACHOEIRA DO SUL (CAPANE)*/}
            <Marker
              position={[-29.94, -52.78]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CACHOEIRA DO SUL (CASA AZUL)*/}
            <Marker
              position={[-29.87, -52.38]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* RIO PARDO*/}
            <Marker
              position={[-30.03, -52.13]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* MINAS DO LEÃO*/}
            <Marker
              position={[-29.79, -51.83]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* TAQUARI*/}
            <Marker
              position={[-29.72, -51.48]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* MONTENEGRO*/}
            <Marker
              position={[-29.55, -52.23]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* VENÂNCIO AIRES*/}
            <Marker
              position={[-29.4, -52.99]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SOBRADINHO*/}
            <Marker
              position={[-29.18, -53.69]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* JULIO DE CASTILHOS*/}
            <Marker
              position={[-29.09, -53.83]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* TUPANCIRETÃ*/}
            <Marker
              position={[-28.69, -54.92]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* BOSSOROCA*/}
            <Marker
              position={[-28.42, -54.96]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO LUIZ GONZAGA*/}
            <Marker
              position={[-28.76, -56.05]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO BORJA ( TERRA DO SOL)*/}
            <Marker
              position={[-28.69, -55.96]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO BORJA ( DDPA)*/}
            <Marker
              position={[-28.65, -56.02]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO BORJA */}
            <Marker
              position={[-28.14, -54.76]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CERRO LARGO */}
            <Marker
              position={[-28.27, -54.22]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SANTO ÂNGELO */}
            <Marker
              position={[-28.6, -53.67]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CRUZ ALTA  */}
            <Marker
              position={[-28.65, -53.11]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* IBIRUBÁ */}
            <Marker
              position={[-28.86, -52.54]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SOLEDADE */}
            <Marker
              position={[-28.94, -52.05]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* ILÓPOLIS(IBRAMATE) */}
            <Marker
              position={[-29.45, -51.82]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* TEUTÔNIA */}
            <Marker
              position={[-29.16, -51.53]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* BENTO GONÇALVES */}
            <Marker
              position={[-28.89, -51.54]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* VERANÓPOLIS */}
            <Marker
              position={[-28.7, -51.87]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SERAFINA CORRÊA */}
            <Marker
              position={[-29.14, -50.99]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CAXIAS DO SUL  */}
            <Marker
              position={[-28.94, -50.61]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO FRANCISCO DE PAULA */}
            <Marker
              position={[-29.37, -50.83]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/*CANELA  */}
            <Marker
              position={[-29.67, -51.06]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CAMPO BOM  */}
            <Marker
              position={[-29.85, -51.19]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* ESTEIO  */}
            <Marker
              position={[-27.74, -54.88]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* PORTO VERA CRUZ  */}
            <Marker
              position={[-27.85, -53.79]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SANTO AUGUSTO  */}
            <Marker
              position={[-27.92, -53.32]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* PALMEIRAS DAS MISSÕES */}
            <Marker
              position={[-27.86, -53.04]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SARANDI  */}
            <Marker
              position={[-27.4, -53.43]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* FREDERICO WESTPHALEN */}
            <Marker
              position={[-27.89, -52.21]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* GETULIO VARGAS  */}
            <Marker
              position={[-28.45, -50.95]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* VACARIA  */}
            <Marker
              position={[-28.51, -50.88]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* VACARIA  */}
            <Marker
              position={[-29.95, -51.12]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CACHOEIRINHA  */}
            <Marker
              position={[-30.03, -51.02]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* VIAMÃO  */}
            <Marker
              position={[-30.19, -51.18]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* POA - BELEM NOVO  */}
            <Marker
              position={[-28.75, -50.06]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* SÃO JOSÉ DOS AUSENTES */}
            <Marker
              position={[-29.05, -50.15]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* CAMBARA DO SUL */}
            <Marker
              position={[-29.35, -49.73]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* TORRES */}
            <Marker
              position={[-29.66, -50.21]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* MAQUINÉ */}
            <Marker
              position={[-30.01, -50.14]}
              icon={iconStation}
              eventHandlers={{
                click: handleClickMarker, // Use o manipulador diretamente
              }}
            ></Marker>
            {/* TRAMANDAÍ */}
          </>
        ) : (
          ""
        )}
        <Marker
          position={[-33.5257, -53.3711]}
          icon={customMarkerIcon}
        ></Marker>
        <Marker position={[-32.035, -52.0986]} icon={customMarkerIcon}></Marker>
        <Marker
          position={[-31.3662, -51.9716]}
          icon={customMarkerIcon}
        ></Marker>
        <Marker
          position={[-29.8262, -50.5179]}
          icon={customMarkerIcon}
        ></Marker>
        {cangucuChecked && cangucu && (
          <ImageOverlay
            bounds={
              typeRadar === "maxcappi"
                ? bounds.cangucu
                : bounds.cangucuNotMaxCappi
            }
            url={handlerSrc ? images[currentImageIndex] : cangucu}
          />
        )}

        {morroDaIgrejaChecked ? (
          <>
            {morroDaIgreja && (
              <ImageOverlay
                bounds={
                  typeRadar === "maxcappi"
                    ? bounds.morroDaIgreja
                    : bounds.morroDaIgrejaNotMaxCappi
                }
                url={
                  handlerSrc
                    ? images[currentImageIndex]
                    : morroDaIgreja
                }
              />
            )}
          </>
        ) : null}

        {santiagoChecked ? (
          <>
            {santiago && (
              <ImageOverlay
                bounds={
                  typeRadar === "maxcappi"
                    ? bounds.santiago
                    : bounds.santiagoNotMaxCappi
                }
                url={
                  handlerSrc
                    ? images[currentImageIndex]
                    : santiago
                }
              />
            )}{" "}
          </>
        ) : null}

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
      <div>{clicked && <Phenomena handleCloseModal={handleCloseModal} />}</div>
    </>
  );
};
