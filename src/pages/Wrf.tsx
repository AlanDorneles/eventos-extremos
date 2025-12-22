import { useEffect, useState } from "react";
import { useWrfImages } from "../contexts/wrfImages";
import styles from "./Wrf.module.css";

const WrfPage: React.FC = () => {
  const {
    visibleImages,
    currentIndex,
    setCurrentIndex,
    fetchWrfImages,
    loading,
    error,
    variable,
    // se existir no seu context novo, prefira usar:
    // imagesAll,
  } = useWrfImages();

  const [playing, setPlaying] = useState(true);

  /**
   * 1) NÃO fazer fetch a cada mudança de variável aqui,
   *    porque o menu lateral já dispara fetchWrfImages(v).
   *    Só faz fetch ao montar se ainda não houver imagens.
   */
  useEffect(() => {
    if (visibleImages.length === 0 && !loading && !error) {
      fetchWrfImages(variable);
    }
    // intencional: não colocar `variable` como dependência para evitar duplicar com o menu
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // apenas na montagem

  /**
   * 2) Garante índice válido quando a lista visível muda.
   *    - se lista ficar vazia: volta para 0
   *    - se índice estourar: ajusta para o último
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
   * 3) Autoplay usando lista visível.
   *    Se não há imagens, não roda.
   */
  useEffect(() => {
    if (!playing || visibleImages.length === 0) return;

    const t = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % visibleImages.length);
    }, 2000);

    return () => clearInterval(t);
  }, [playing, visibleImages.length, setCurrentIndex]);

  const hasImages = visibleImages.length > 0;

  return (
    <div className={styles.wrfPage}>
      {loading && <div>Carregando imagens...</div>}
      {error && <div style={{ color: "red" }}>Erro: {error}</div>}

      {!loading && !hasImages && !error && <div>Nenhuma imagem disponível.</div>}

      {hasImages && (
        <>
          <div className={styles.controlsRow}>
            <button
              className="button is-primary is-large"
              onClick={() =>
                setCurrentIndex(
                  (idx) => (idx - 1 + visibleImages.length) % visibleImages.length
                )
              }
              aria-label="previous"
              style={{ fontSize: "0.75rem", padding: "0.75rem 1.25rem" }}
              disabled={visibleImages.length === 0}
            >
              ❮
            </button>

            <div className={styles.imageWrapper}>
              <img
                src={visibleImages[currentIndex]}
                alt={`WRF ${currentIndex + 1}`}
                className={styles.imgResponsive}
                loading="lazy"
              />
            </div>

            <button
              className="button is-primary is-large"
              onClick={() => setCurrentIndex((idx) => (idx + 1) % visibleImages.length)}
              aria-label="next"
              style={{ fontSize: "0.75rem", padding: "0.75rem 1.25rem" }}
              disabled={visibleImages.length === 0}
            >
              ❯
            </button>
          </div>

          <div className={styles.controlsColumn}>
            <button
              className={`button ${playing ? "is-danger" : "is-success"} ${styles.navButton}`}
              onClick={() => setPlaying((p) => !p)}
              disabled={visibleImages.length === 0}
            >
              {playing ? "Pausar" : "Continuar"}
            </button>

            <small>
              {currentIndex + 1} / {visibleImages.length}
            </small>
          </div>
        </>
      )}
    </div>
  );
};

export default WrfPage;
