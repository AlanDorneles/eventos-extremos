import { useState, useEffect } from "react";
import { CPPMETImages } from "../services/cpmetUFPEL.js";

export default function Satellite() {
  const imagesCPP = CPPMETImages();
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState(imagesCPP[0]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % imagesCPP.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [imagesCPP.length]);

  useEffect(() => {
    setImage(imagesCPP[index]);
  }, [index, imagesCPP]);

  return (
    <>
      <div>
        <img src={image} alt={`Image ${index + 1}`} />
      </div>
    </>
  );
}
