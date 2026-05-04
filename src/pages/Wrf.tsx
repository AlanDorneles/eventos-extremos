import { useEffect, useState } from "react";
import { useWrfImages } from "../contexts/wrfImages";
import { BaseMap } from "../components/map/BaseMap";
import { ImageOverlay } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const WrfPage: React.FC = () => {
  const {
    visibleImages,
    currentIndex,
    setCurrentIndex,
    fetchWrfImages,
    loading,
    error,
    variable,
  } = useWrfImages();

  const [playing, setPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);

  // Coordenadas do WRF (ajuste conforme sua cobertura)
  const wrfBounds: LatLngBoundsExpression = [
    [-35.5, -57.8],
    [-27.0, -48.2],
  ];

  /**
   * 1) Fazer fetch ao montar
   */
  useEffect(() => {
    if (visibleImages.length === 0 && !loading && !error) {
      fetchWrfImages(variable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 2) Garante índice válido
   */
  useEffect(() => {
    if (visibleImages.length === 0) {
      if (currentIndex !== 0) setCurrentIndex(0);
      return;
    }
    if (currentIndex > visibleImages.length - 1) {
      setCurrentIndex(visibleImages.length - 1);
    }
  }, [visibleImages.length, currentIndex, setCurrentIndex]);

  /**
   * 3) Autoplay
   */
  useEffect(() => {
    if (!playing || visibleImages.length === 0) return;

    const t = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % visibleImages.length);
    }, playbackSpeed);

    return () => clearInterval(t);
  }, [playing, visibleImages.length, setCurrentIndex, playbackSpeed]);

  const hasImages = visibleImages.length > 0;
  const currentImage = hasImages ? visibleImages[currentIndex] : null;

  return (
    <>
      {loading && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Carregando imagens WRF...</p>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "red",
            backgroundColor: "#fff3cd",
          }}
        >
          <p>Erro: {error}</p>
        </div>
      )}

      {!loading && !hasImages && !error && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Nenhuma imagem WRF disponível. Selecione uma variável no menu lateral.</p>
        </div>
      )}

      {hasImages && (
        <BaseMap
          center={[-30.5, -52.5]}
          zoom={7}
          showImageControls={true}
          currentImageIndex={currentIndex}
          isPlaying={playing}
          onTogglePlaying={() => setPlaying((p) => !p)}
          onPreviousImage={() =>
            setCurrentIndex(
              (idx) => (idx - 1 + visibleImages.length) % visibleImages.length
            )
          }
          onNextImage={() =>
            setCurrentIndex((idx) => (idx + 1) % visibleImages.length)
          }
          playbackSpeedMs={playbackSpeed}
          onPlaybackSpeedChange={(speed) => setPlaybackSpeed(speed)}
          showMapChip={true}
        >
          {currentImage && (
            <ImageOverlay
              url={currentImage}
              bounds={wrfBounds}
            />
          )}
        </BaseMap>
      )}
    </>
  );
};

export default WrfPage;
