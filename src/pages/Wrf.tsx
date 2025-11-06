import React, { useEffect, useState } from "react";
import { useWrfImages } from "../contexts/wrfImages";
import styles from "./Wrf.module.css";

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
      <div className={styles.wrfPage}>
        <h2>WRF</h2>
        Nenhuma imagem selecionada.
      </div>
    );
  }

  return (
    <div className={styles.wrfPage}>
      <div className={styles.controlsRow}>
        <button
          className="button is-primary"
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + images.length) % images.length)
          }
          aria-label="previous"
        >
          &lt;
        </button>
        <div className={styles.imageWrapper}>
          <img
            src={images[currentIndex]}
            alt={`WRF ${currentIndex + 1}`}
            className={styles.imgResponsive}
          />
        </div>

        <button
          className="button is-primary"
          onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
          aria-label="next"
        >
          &gt;
        </button>
      </div>
      <div className={styles.controlsColumn}>
		<button
			className={`button ${playing ? "is-danger" : "is-success"} ${styles.navButton}`}
			onClick={() => setPlaying((p) => !p)}
		>
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
