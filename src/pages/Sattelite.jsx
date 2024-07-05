import { useState, useEffect, useContext } from "react";
import { CPPMETImages } from "../services/cpmetUFPEL.js";
import { CPTECImages } from "../services/cptecINPE.js";
import { ButtonSatContext } from "../contexts/buttonSat.jsx";
import styles from "./styles/Satellite.module.css";
import { useImageContext } from "../contexts/satImageUpdate";

export default function Satellite() {
  const imagesCPP = CPPMETImages();
  const [index, setIndex] = useState(0);
  const [imageCPMET, setImage] = useState(imagesCPP[0]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % imagesCPP.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [imagesCPP.length]);

  useEffect(() => {
    setImage(imagesCPP[index]);
  }, [index, imagesCPP]);

  const imagesCPTEC = CPTECImages();
  const [indexINPE, setIndexINPE] = useState(0);
  const [imageINPE, setImageINPE] = useState(imagesCPTEC[0]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndexINPE(prevIndex => (prevIndex + 1) % imagesCPTEC.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [imagesCPTEC.length]);

  useEffect(() => {
    setImageINPE(imagesCPTEC[indexINPE]);
  }, [indexINPE, imagesCPTEC]);

  const { UFPEL } = useContext(ButtonSatContext);
  const { image } = useImageContext();

  return (
    <>
      <div className={styles.container}>
        <div id="UFPEL" className={styles.imageContainer} style={{ display: UFPEL ? 'none' : '' }}>
          <img src={imageCPMET} alt={`Image ${index + 1} CPMET UFPEL`} />
        </div>
        {/* <div>
          {image && <img src={image} alt="Imagem sobreposta" style={{ position: 'absolute' }} />}
        </div> */}
        <div id="INPE" className={styles.imageINPE} style={{ display: UFPEL ? '' : 'none' }}>
          <img src={imageINPE} alt={`Image ${indexINPE + 1} CPTEC INPE`} />
        </div>
      </div>
    </>
  );
}
