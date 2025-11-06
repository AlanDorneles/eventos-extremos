import React, { useEffect, useState } from "react";
import { useWrfImages } from "../contexts/wrfImages";

const WrfPage: React.FC = () => {
  const { images, currentIndex, setCurrentIndex } = useWrfImages();
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images, setCurrentIndex]);

  useEffect(() => {
    if (!playing || images.length === 0) return;

    const t = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(t);
  }, [playing, images.length, setCurrentIndex, currentIndex]);

  if (images.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <h2>WRF</h2>
        Nenhuma imagem selecionada.
      </div>
    );
  }

  return (
    <div style={{ padding: 12 }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          width: "70vw",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + images.length) % images.length)
          }
        >
          &lt;
        </button>

        <div
          style={{
            width: 720,
            height: 480,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={images[currentIndex]}
            alt={`WRF ${currentIndex + 1}`}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>

        <button onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}>
          &gt;
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          width: "70vw",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 8,
        }}
      >
        <button onClick={() => setPlaying((p) => !p)}>
          {playing ? "Pausar" : "Tocar"}
        </button>

        <small>
          {currentIndex + 1} / {images.length}
        </small>
      </div>
    </div>
  );
};

export default WrfPage;
