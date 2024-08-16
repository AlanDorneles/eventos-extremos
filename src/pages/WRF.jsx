import { useState, useEffect } from "react";
import { wrfLocal } from "../services/wrfLocal.js";
import styles from "./styles/Satellite.module.css";

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

  return (
    <>
      <div className={styles.container}>
        <div id="WRF" className={styles.imageWRF}>
          <img src={imageWRF} alt={`Image ${indexWRF + 1} WRF`} />
        </div>
      </div>
    </>
  );
}
