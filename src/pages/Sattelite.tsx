import { useEffect, useState } from "react";
import { DataCPTECAPI } from "../services/cpmetUFPEL.js";
import { useButtonSat } from "../contexts/buttonSat.js";
import styles from "./styles/Satellite.module.css";
import { useImageContext } from "../contexts/satImageUpdate.js";

export default function Satellite() {
  const [images, setImages] = useState<{ INPE: string[]; CPPMET: string[] }>({
    INPE: [],
    CPPMET: [],
  });

  const { CPPMET } = useButtonSat();
  const { imageIndex } = useImageContext();
  const source = CPPMET ? "CPPMET" : "INPE";
  const [zoom, setZoom] = useState(false);
  console.log(source, imageIndex);

  useEffect(() => {
    const fetchImages = async () => {
      const result = await DataCPTECAPI();
      setImages(result);
    };
    fetchImages();
  }, []);

  const currentImageList = images[source] || [];
  const imageToDisplay = currentImageList[imageIndex + 1] || null;
  //console.log(imageToDisplay);

  return (
    <div className={styles.container}>
      <div className={source ==="CPPMET" ? styles.nocontrols : styles.controls}>
        <button
          className="button is-primary is-outlined is-small"
          onClick={() => setZoom(true)}
        >
          +
        </button>
        <button
          className="button is-primary is-outlined is-small"
          onClick={() => setZoom(false)}
        >
          -
        </button>
      </div>
      <div className={styles.imageContainer}>
        {imageToDisplay ? (
          <img
            src={imageToDisplay}
            alt={`Imagem ${imageIndex + 1} - ${source}`}
            className={
              zoom && source === "INPE"
                ? styles.imageCropped
                : styles.imageNormal
            }
          />
        ) : (
          <p>Nenhuma imagem selecionada</p>
        )}
      </div>
    </div>
  );
}
