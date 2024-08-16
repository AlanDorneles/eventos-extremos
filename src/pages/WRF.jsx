import { useState, useEffect, useContext } from "react";
import { wrfLocal } from "../services/wrfLocal.js";
import styles from "./styles/Satellite.module.css";
import { useImageContext } from "../contexts/satImageUpdate";

export default function WRF() {
  const imagesWRF = wrfLocal();
  const [indexWRF, setIndexWRF] = useState(0);
  const [imageWRF, setImageWRF] = useState(imagesWRF[0]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndexWRF(prevIndex => (prevIndex + 1) % imagesWRF.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [imagesWRF.length]);

  useEffect(() => {
    setImageWRF(imagesWRF[indexWRF]);
  }, [indexWRF, imagesWRF]);

  const { image } = useImageContext();

  return (
    <>
      <div className={styles.container}>
        {/* <div>
          {image && <img src={image} alt="Imagem sobreposta" style={{ position: 'absolute' }} />}
        </div> */}
        <div id="WRF" className={styles.imageWRF}>
          <img src={imageWRF} alt={`Image ${indexWRF + 1} WRF`} />
        </div>
      </div>
    </>
  );
}
