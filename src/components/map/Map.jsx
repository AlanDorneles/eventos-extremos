import {MapContainer,TileLayer,Circle,Pane,ImageOverlay,/*Rectangle,*/ Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { customMarkerIcon, iconStation } from "../marker/marker.jsx";
import { circleOptions } from "../../constants/constants.js";
import { useState , useEffect} from "react";
import { useStationsVisible } from "../../contexts/radarFilter.jsx";
import { useCodeStation } from "../../contexts/codeStation.jsx";
import { bounds, radius } from "../../constants/bounds.js";
import { getRadarInformation } from "../../services/redemet.js";
import { Phenomena } from "../../components/phenomena/Phenomena.jsx";
import { useFilterTypeRadarContext } from "../../contexts/typeRadar.jsx";
import PropTypes from 'prop-types';

export const Map = ({cangucuChecked, santiagoChecked,morroDaIgrejaChecked, handlerSrc,images,currentImageIndex}) => {
  const { typeRadar } = useFilterTypeRadarContext(); 
  const [clicked, setClicked] = useState(false);
    const { codeStation, setCodeStation } = useCodeStation();
    const { stationsVisible } = useStationsVisible();
    const [morroDaIgreja, setMorroDaIgreja] = useState("");
    const [cangucu, setCangucu] = useState("");
    const [santiago, setSantiago] = useState("");
    const handleCloseModal = () => {
    setClicked(false);
  };
  const [radiusRadar, setRadiusRadar] = useState()
  
  useEffect(()=> {
    if(typeRadar !== 'maxcappi'){
      setRadiusRadar(radius[1])
    }else{
      setRadiusRadar(radius[0])
    }

  },[typeRadar])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const radarInformation = await getRadarInformation();
            setMorroDaIgreja(radarInformation.morroDaIgreja);
            setCangucu(radarInformation.cangucu);
            setSantiago(radarInformation.santiago);
          } catch (error) {
            console.error("Erro ao obter informações do radar:", error);
          }
        };
    
        fetchData();
      }, []);
    const handleClickModal = () => {
        setClicked(true);
        
      };
      const handleClickMarker = (event) => {
        const { id } = event.target.options;
        setCodeStation(id); 
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
        <Pane style={{ zIndex: 500 }}>
          <Circle
            center={[-31.404, -52.701644]}
            pathOptions={circleOptions}
            radius={radiusRadar}
            border={true}
          />
        </Pane>
      ) : null}
      {/*<Rectangle bounds={[
    [-25.87, -52.05],
    [-30.4, -46.9],
  ]} pathOptions={{ color: 'black' }}/>*/}
      {morroDaIgrejaChecked ? (
        <Pane style={{ zIndex: 500 }}>
          <Circle
            center={[-28.128373, -49.471816]}
            pathOptions={circleOptions}
            radius={radiusRadar}
            border={false}
          />
        </Pane>
      ) : null}
      {/*<Rectangle bounds={ [
    [-26.95, -57.55],
    [-31.5, -52.35],
  ]} pathOptions={{ color: 'green' }}/>*/}
      {santiagoChecked ? (
        <Pane style={{ zIndex: 500 }}>
          <Circle
            center={[-29.225213, -54.930257]}
            pathOptions={circleOptions}
            radius={radiusRadar}
            border={false}
          />
        </Pane>
      ) : null}

      {stationsVisible == false ? (
        <>
          <Marker
            position={[-33.74, -53.37]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "83998" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>{" "}
          {/* CHUÍ */}
          <Marker
            position={[-29.7, -53.68]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0633" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>{" "}
          {/* SANTA MARIA */}
          <Marker
            position={[-29.84, -57.08]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A809" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>{" "}
          {/*URUGUAIANA */}
          <Marker
            position={[-32.08, -52.17]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A802" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* RIO GRANDE */}
          <Marker
            position={[-32.53, -53.38]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A836" } } }),
                  handleClickModal();
              },
            }}
          >
          </Marker>
          {/* JAGUARÃO */}
          <Marker
            position={[-31.96, -53.49]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0615" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* HERVAL */}
          <Marker
            position={[-31.8, -52.51]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0628" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* PELOTAS */}
          <Marker
            position={[-31.67, -53.1]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0630" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* PIRATINI */}
          <Marker
            position={[-31.5, -53.51]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0629" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* PINHEIRO MACHADO */}
          <Marker
            position={[-31.39, -53.93]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0616" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* HULHA NEGRA */}
          <Marker
            position={[-31.35, -54.01]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A827" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* BAGÉ*/}
          <Marker
            position={[-31.0, -54.62]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A881" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* DOM PEDRITO*/}
          <Marker
            position={[-30.75, -55.4]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A804" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SANTANA DO LIVRAMENTO*/}
          <Marker
            position={[-29.16, -56.55]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0618" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* ITAQUI*/}
          <Marker
            position={[-29.21, -56.35]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0619" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* ITAQUI VMAER*/}
          <Marker
            position={[-29.13, -56.02]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0623" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* MACAMBARÁ*/}
          <Marker
            position={[-29.71, -55.53]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A826" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* ALEGRETE*/}
          <Marker
            position={[-30.26, -54.84]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0632" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* ROSÁRIO DO SUL*/}
          <Marker
            position={[-30.34, -54.31]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A832" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO GABRIEL*/}
          <Marker
            position={[-30.34, -54.26]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0638" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO GABRIEL*/}
          <Marker
            position={[-30.72, -53.96]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0622" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* LAVRAS DO SUL*/}
          <Marker
            position={[-30.9, -53.43]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0604" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CAÇAPAVA DO SUL (MINAS DO CAMAQUÃ)*/}
          <Marker
            position={[-30.94, -52.74]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0608" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CANGUÇU OLIVAL CAPOLIVO*/}
          <Marker
            position={[-31.4, -52.7]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A811" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CANGUÇU*/}
          <Marker
            position={[-31.36, -52.27]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0639" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO LOURENÇO DO SUL*/}
          <Marker
            position={[-30.81, -51.83]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A838" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CAMAQUÃ*/}
          <Marker
            position={[-30.57, -51.53]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0601" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* BARRA DO RIBEIRO*/}
          <Marker
            position={[-30.55, -52.41]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0612" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* ENCRUZILHADA DO SUL*/}
          <Marker
            position={[-30.55, -53.47]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A812" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CAÇAPAVA DO SUL*/}
          <Marker
            position={[-30.41, -53.45]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0603" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CAÇAPAVA DO SUL (COSTI OLIVOS)*/}
          <Marker
            position={[-30.37, -53.51]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0640" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO SEPÉ*/}
          <Marker
            position={[-29.19, -54.89]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A833" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SANTIAGO*/}
          <Marker
            position={[-29.48, -54.73]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0620" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* JAGUARI ( MIRANTE MINUZZI)*/}
          <Marker
            position={[-29.7, -54.69]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A889" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO VICENTE DO SUL*/}
          <Marker
            position={[-30.22, -52.94]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0605" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CACHOEIRA DO SUL (CAPANE)*/}
          <Marker
            position={[-29.94, -52.78]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0606" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CACHOEIRA DO SUL (CASA AZUL)*/}
          <Marker
            position={[-29.87, -52.38]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A813" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* RIO PARDO*/}
          <Marker
            position={[-30.03, -52.13]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0626" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* MINAS DO LEÃO*/}
          <Marker
            position={[-29.79, -51.83]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0643" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* TAQUARI*/}
          <Marker
            position={[-29.72, -51.48]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0627" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* MONTENEGRO*/}
          <Marker
            position={[-29.55, -52.23]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0645" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* VENÂNCIO AIRES*/}
          <Marker
            position={[-29.4, -52.99]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0642" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SOBRADINHO*/}
          <Marker
            position={[-29.18, -53.69]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0621" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* JULIO DE CASTILHOS*/}
          <Marker
            position={[-29.09, -53.83]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A886" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* TUPANCIRETÃ*/}
          <Marker
            position={[-28.69, -54.92]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0602" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* BOSSOROCA*/}
          <Marker
            position={[-28.42, -54.96]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A852" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO LUIZ GONZAGA*/}
          <Marker
            position={[-28.76, -56.05]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0636" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO BORJA ( TERRA DO SOL)*/}
          <Marker
            position={[-28.69, -55.96]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0635" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO BORJA ( DDPA)*/}
          <Marker
            position={[-28.65, -56.02]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A830" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO BORJA */}
          <Marker
            position={[-28.14, -54.76]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0610" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CERRO LARGO */}
          <Marker
            position={[-28.27, -54.22]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0634" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SANTO ÂNGELO */}
          <Marker
            position={[-28.6, -53.67]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A853" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CRUZ ALTA  */}
          <Marker
            position={[-28.65, -53.11]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A883" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* IBIRUBÁ */}
          <Marker
            position={[-28.86, -52.54]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A837" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SOLEDADE */}
          <Marker
            position={[-28.94, -52.05]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0617" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* ILÓPOLIS(IBRAMATE) */}
          <Marker
            position={[-29.45, -51.82]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A882" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* TEUTÔNIA */}
          <Marker
            position={[-29.16, -51.53]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A840" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* BENTO GONÇALVES */}
          <Marker
            position={[-28.89, -51.54]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0646" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* VERANÓPOLIS */}
          <Marker
            position={[-28.7, -51.87]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A894" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SERAFINA CORRÊA */}
          <Marker
            position={[-29.14, -50.99]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0609" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CAXIAS DO SUL  */}
          <Marker
            position={[-28.94, -50.61]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0637" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO FRANCISCO DE PAULA */}
          <Marker
            position={[-29.37, -50.83]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A879" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/*CANELA  */}
          <Marker
            position={[-29.67, -51.06]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A884" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CAMPO BOM  */}
          <Marker
            position={[-29.85, -51.19]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0613" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* ESTEIO  */}
          <Marker
            position={[-27.74, -54.88]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0631" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* PORTO VERA CRUZ  */}
          <Marker
            position={[-27.85, -53.79]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A805" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SANTO AUGUSTO  */}
          <Marker
            position={[-27.92, -53.32]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A856" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* PALMEIRAS DAS MISSÕES */}
          <Marker
            position={[-27.86, -53.04]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0641" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SARANDI  */}
          <Marker
            position={[-27.4, -53.43]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A854" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* FREDERICO WESTPHALEN */}
          <Marker
            position={[-27.89, -52.21]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0614" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* GETULIO VARGAS  */}
          <Marker
            position={[-28.45, -50.95]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0644" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* VACARIA  */}
          <Marker
            position={[-28.51, -50.88]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A880" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* VACARIA  */}
          <Marker
            position={[-29.95, -51.12]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0607" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CACHOEIRINHA  */}
          <Marker
            position={[-30.03, -51.02]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0647" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* VIAMÃO  */}
          <Marker
            position={[-30.19, -51.18]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "B807" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* POA - BELEM NOVO  */}
          <Marker
            position={[-28.75, -50.06]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A829" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* SÃO JOSÉ DOS AUSENTES */}
          <Marker
            position={[-29.05, -50.15]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A897" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* CAMBARA DO SUL */}
          <Marker
            position={[-29.35, -49.73]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A808" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* TORRES */}
          <Marker
            position={[-29.66, -50.21]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "V0625" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* MAQUINÉ */}
          <Marker
            position={[-30.01, -50.14]}
            icon={iconStation}
            className="iconStation"
            eventHandlers={{
              click: () => {
                handleClickMarker({ target: { options: { id: "A834" } } }),
                  handleClickModal();
              },
            }}
          ></Marker>
          {/* TRAMANDAÍ */}
        </>
      ) : (
        ""
      )}
      <Marker position={[-33.5257, -53.3711]} icon={customMarkerIcon}></Marker>
      <Marker position={[-32.035, -52.0986]} icon={customMarkerIcon}></Marker>
      <Marker position={[-31.3662, -51.9716]} icon={customMarkerIcon}></Marker>
      <Marker position={[-29.8262, -50.5179]} icon={customMarkerIcon}></Marker>
      {cangucuChecked ? (
        <>
          {cangucu.path && (
            <ImageOverlay
              bounds={ typeRadar ==='maxcappi' ? bounds.cangucu : bounds.cangucuNotMaxCappi}
              url={
                handlerSrc ? images[currentImageIndex].cangucu : cangucu.path
              }
            />
          )}{" "}
        </>
      ) : null}

      {morroDaIgrejaChecked ? (
        <>
          {morroDaIgreja.path && (
            <ImageOverlay
              bounds={typeRadar ==='maxcappi' ? bounds.morroDaIgreja : bounds.morroDaIgrejaNotMaxCappi}
              url={
                handlerSrc
                  ? images[currentImageIndex].morroDaIgreja
                  : morroDaIgreja.path
              }
            />
          )}
        </>
      ) : null}

      {santiagoChecked ? (
        <>
          {santiago.path && (
            <ImageOverlay
              bounds={typeRadar ==='maxcappi' ? bounds.santiago : bounds.santiagoNotMaxCappi}
              url={
                handlerSrc ? images[currentImageIndex].santiago : santiago.path
              }
            />
          )}{" "}
        </>
      ) : null}

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
    <div>
    {clicked && <Phenomena handleCloseModal={handleCloseModal}/>}
    </div>
    </>
  );
};

Map.propTypes = {
    cangucuChecked: PropTypes.bool.isRequired,
    santiagoChecked: PropTypes.bool.isRequired,
    morroDaIgrejaChecked: PropTypes.bool.isRequired,
    handlerSrc: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
    currentImageIndex: PropTypes.number.isRequired,
};