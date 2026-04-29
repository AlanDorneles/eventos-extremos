import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { DataCPTECAPI } from "../services/cpmetUFPEL.js";
import { useButtonSat } from "../contexts/buttonSat.js";
import styles from "./styles/Satellite.module.css";
import { useImageContext } from "../contexts/satImageUpdate.js";
import { ImageOverlay, useMap } from "react-leaflet";
import type { LatLngBoundsExpression, Map as LeafletMap } from "leaflet";
import { BaseMap } from "../components/map/BaseMap";
import { ScaleLegend } from "../components/map/ScaleLegend";

/**
 * Componente que faz a imagem se adequar ao zoom do mapa
 * Pode ser expandido para ajustar dinamicamente os bounds baseado no zoom
 */
function SatelliteImageLayer() {
  const map = useMap() as LeafletMap;

  useEffect(() => {
    const handleZoom = () => {
      const zoom = map.getZoom();
      // TODO: Adicionar lógica para ajustar os bounds baseado no zoom
      // Por enquanto mantém os bounds fixos
    };

    map.on("zoomend", handleZoom);
    return () => {};
  }, [map]);

  return null;
}

export default function Satellite() {
  const [images, setImages] = useState<{ INPE: string[]; CPPMET: string[] }>({
    INPE: [],
    CPPMET: [],
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);

  const { CPPMET } = useButtonSat();
  const { imageIndex } = useImageContext();

  const source = CPPMET ? "CPPMET" : "INPE";

  useEffect(() => {
    const fetchImages = async () => {
      const result = await DataCPTECAPI();
      setImages(result);
    };

    fetchImages();
  }, []);

  const currentImageList = images[source] || [];
  const imageUrl = currentImageList[(imageIndex ?? 0) + 1] || null;
  const imageToDisplay = imageUrl || "/no-data1.png";

  const satelliteBounds: LatLngBoundsExpression = [
    [-55, -115], // sul/oeste
    [35, -25], // norte/leste
  ];

  const handlePreviousImage = () => {
    // TODO: Implementar lógica de imagem anterior com contexto
    console.log("Previous image");
  };

  const handleNextImage = () => {
    // TODO: Implementar lógica de próxima imagem com contexto
    console.log("Next image");
  };

  const handleTogglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePlaybackSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  return (
    <div className={styles.container}>
      <BaseMap
        center={[-15, -60]}
        zoom={4}
        showImageControls={true}
        currentImageIndex={imageIndex ?? 0}
        isPlaying={isPlaying}
        onTogglePlaying={handleTogglePlaying}
        onPreviousImage={handlePreviousImage}
        onNextImage={handleNextImage}
        playbackSpeedMs={playbackSpeed}
        onPlaybackSpeedChange={handlePlaybackSpeedChange}
        showMapChip={true}
      >
        <ScaleLegend />
        {/* Imagem de satélite sobreposta ao mapa */}
        <ImageOverlay
          url={imageToDisplay}
          bounds={satelliteBounds}
          eventHandlers={{
            error: () => {
              console.error("Erro ao carregar imagem de satélite");
            },
          }}
        />
        {/* Listener para detectar mudanças de zoom */}
        <SatelliteImageLayer />
      </BaseMap>
    </div>
  );
}
