import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import { useState, useEffect, ReactNode } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPause,
  FaPlay,
  FaSlidersH,
} from "react-icons/fa";
import styles from "./mapControls.module.css";
import indexToTimeLabel from "../../utils/IndexToHour";

const AnyMapContainer = MapContainer as any;

interface BaseMapProps {
  center: any;
  zoom: number;
  // keep interface minimal — zoom/bounds controlled by MapContainer defaults
  children?: ReactNode;
  showImageControls?: boolean;
  currentImageIndex?: number;
  isPlaying?: boolean;
  onTogglePlaying?: () => void;
  onPreviousImage?: () => void;
  onNextImage?: () => void;
  playbackSpeedMs?: number;
  onPlaybackSpeedChange?: (speed: number) => void;
  showMapChip?: boolean;
}

// Componente para detectar mudanças de zoom
function ZoomListener({
  onZoomChange,
}: {
  onZoomChange?: (zoom: number) => void;
}) {
  useMapEvent("zoomend", (e: any) => {
    if (onZoomChange) {
      onZoomChange(e.target.getZoom());
    }
  });
  return null;
}

export const BaseMap = ({
  center,
  zoom,

  children,
  showImageControls = true,
  currentImageIndex = 0,
  isPlaying = false,
  onTogglePlaying,
  onPreviousImage,
  onNextImage,
  playbackSpeedMs = 500,
  onPlaybackSpeedChange,
  showMapChip = true,
}: BaseMapProps) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 900 : false,
  );
  const [showMobileControls, setShowMobileControls] = useState(false);

  const MIN_PLAYBACK_DELAY_MS = 300;
  const MAX_PLAYBACK_DELAY_MS = 2000;
  const sliderSpeedValue =
    MIN_PLAYBACK_DELAY_MS + MAX_PLAYBACK_DELAY_MS - playbackSpeedMs;

  const handleSpeedChange = (sliderValue: number) => {
    const mappedDelay =
      MIN_PLAYBACK_DELAY_MS + MAX_PLAYBACK_DELAY_MS - sliderValue;
    if (onPlaybackSpeedChange) {
      onPlaybackSpeedChange(mappedDelay);
    }
  };

  const normalizedImageIndex = ((currentImageIndex % 144) + 144) % 144;
  const indexHour = indexToTimeLabel(normalizedImageIndex);

  useEffect(() => {
    if (!isMobile) {
      setShowMobileControls(false);
    }
  }, [isMobile]);

  const stopOverlayEvent = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <AnyMapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100vh" }}
    >
      <ZoomListener onZoomChange={() => {}} />

      {showMapChip && (
        <div className={styles.mapChip + " mapControlsZ"}>
          {"Hora da Imagem: " + indexHour}
        </div>
      )}

      {showImageControls && (
        <>
          {/* CONTROLES DESKTOP */}
          {!isMobile && (
            <div
              style={{
                position: "fixed",
                left: 0,
                bottom: 0,
                zIndex: 2000,
                width: 180,
                height: 160,
                pointerEvents: "auto",
              }}
              onPointerDown={stopOverlayEvent}
              onMouseDown={stopOverlayEvent}
              onTouchStart={stopOverlayEvent}
              onClick={stopOverlayEvent}
            >
              <div
                className={styles.speedPanel + " mapControlsZ"}
                style={{ pointerEvents: "none" }}
              >
                <label
                  className={styles.speedLabel}
                  style={{ pointerEvents: "none" }}
                >
                  Velocidade
                </label>
                <input
                  type="range"
                  min={MIN_PLAYBACK_DELAY_MS}
                  max={MAX_PLAYBACK_DELAY_MS}
                  step={100}
                  value={sliderSpeedValue}
                  onChange={(e) => handleSpeedChange(Number(e.target.value))}
                  aria-label="Controle de velocidade do player"
                  className={styles.speedRange}
                  style={{ pointerEvents: "auto" }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onWheel={(e) => e.stopPropagation()}
                />
              </div>
              <div
                className={styles.playerRow + " mapControlsZ"}
                style={{ pointerEvents: "none" }}
              >
                <button
                  type="button"
                  className={styles.playerButton}
                  onClick={onPreviousImage}
                  aria-label="Imagem anterior"
                  title="Anterior"
                  style={{ pointerEvents: "auto" }}
                >
                  <FaChevronLeft size={11} />
                </button>
                <button
                  type="button"
                  className={styles.playerButtonMain}
                  onClick={onTogglePlaying}
                  aria-label={isPlaying ? "Pausar player" : "Iniciar player"}
                  title={isPlaying ? "Pausar" : "Reproduzir"}
                  style={{ pointerEvents: "auto" }}
                >
                  {isPlaying ? (
                    <FaPause size={12} />
                  ) : (
                    <FaPlay size={12} className={styles.playIconAdjust} />
                  )}
                </button>
                <button
                  type="button"
                  className={styles.playerButton}
                  onClick={onNextImage}
                  aria-label="Próxima imagem"
                  title="Próxima"
                  style={{ pointerEvents: "auto" }}
                >
                  <FaChevronRight size={11} />
                </button>
              </div>
            </div>
          )}

          {/* CONTROLES MOBILE */}
          {isMobile && (
            <>
              <button
                type="button"
                className={styles.controlsHub + " mapControlsZ"}
                onClick={() => setShowMobileControls((prev) => !prev)}
                aria-label="Abrir controles de imagem"
                title="Controles"
                onPointerDown={stopOverlayEvent}
                onMouseDown={stopOverlayEvent}
                onTouchStart={stopOverlayEvent}
              >
                <FaSlidersH size={14} />
              </button>

              {showMobileControls && (
                <div
                  className={styles.mobileControlsPanel + " mapControlsZ"}
                  onPointerDown={stopOverlayEvent}
                  onMouseDown={stopOverlayEvent}
                  onTouchStart={stopOverlayEvent}
                  onClick={stopOverlayEvent}
                >
                  <label className={styles.speedLabel}>Velocidade</label>
                  <input
                    type="range"
                    min={MIN_PLAYBACK_DELAY_MS}
                    max={MAX_PLAYBACK_DELAY_MS}
                    step={100}
                    value={sliderSpeedValue}
                    onChange={(e) => handleSpeedChange(Number(e.target.value))}
                    aria-label="Controle de velocidade do player"
                    className={styles.speedRange}
                  />

                  <div className={styles.playerRowMobile}>
                    <button
                      type="button"
                      className={styles.playerButton}
                      onClick={onPreviousImage}
                      aria-label="Imagem anterior"
                      title="Anterior"
                    >
                      <FaChevronLeft size={11} />
                    </button>

                    <button
                      type="button"
                      className={styles.playerButtonMain}
                      onClick={onTogglePlaying}
                      aria-label={
                        isPlaying ? "Pausar player" : "Iniciar player"
                      }
                      title={isPlaying ? "Pausar" : "Reproduzir"}
                    >
                      {isPlaying ? (
                        <FaPause size={12} />
                      ) : (
                        <FaPlay size={12} className={styles.playIconAdjust} />
                      )}
                    </button>

                    <button
                      type="button"
                      className={styles.playerButton}
                      onClick={onNextImage}
                      aria-label="Próxima imagem"
                      title="Próxima"
                    >
                      <FaChevronRight size={11} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Deixamos a camada OSM quase invisível por padrão para efeito de continuidade com ImageOverlay.
          Caso queira totalmente removê-la, passe `hideTileLayer` como true ao componente. */}
      {/* Usamos uma opacidade baixa para manter referência espacial sutil sobre fundo cinza. */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {children}
    </AnyMapContainer>
  );
};
