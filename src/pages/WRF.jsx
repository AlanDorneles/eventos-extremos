import { useState, useEffect } from "react";
import { wrfLocal } from "../services/wrfLocal";
import styles from "./styles/wrf.module.css";
import nomeDasPastas from "../../pastasWRF.json";

export default function WRF() {
  const [selectedDate, setSelectedDate] = useState("");
  const [imagesWRF, setImagesWRF] = useState([]);
  const [indexWRF, setIndexWRF] = useState(0);
  const [datesOptions, setDatesOptions] = useState([]);

  useEffect(() => {
    const formattedFolders = nomeDasPastas.folders.map((folder) => {
      const formattedDate = `${folder.slice(6, 8)}/${folder.slice(4, 6)}/${folder.slice(0, 4)}`;
      return { name: formattedDate, date: folder };
    });
    setDatesOptions(formattedFolders);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const images = wrfLocal(selectedDate); // Assume que wrfLocal retorna um array de URLs de imagens
      setImagesWRF(images);
      setIndexWRF(0);
    }
  }, [selectedDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexWRF((prevIndex) => {
        if (isNaN(prevIndex)) {
          console.error("Index WRF é NaN, passando para 0.");
          return (imagesWRF.length - 1) % imagesWRF.length;
        }
        return (prevIndex + 1) % imagesWRF.length;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const handleDateChange = (event) => {
    const selectedOption = datesOptions.find(
      (option) => option.name === event.target.value
    );
    setSelectedDate(selectedOption ? selectedOption.date : "");
  };

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const extractTimeFromFileName = (fileName) => {
    const baseName = fileName.split('.')[0];
    const parts = baseName.split('_');
    const [hour, minute, second] = parts.slice(-3);
    return `${hour}:${minute}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <select
          onChange={handleDateChange}
          value={
            datesOptions.find((option) => option.date === selectedDate)?.name ||
            ""
          }
        >
          <option value="">Selecione uma data</option>
          {datesOptions.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        <div className={styles.buttonContainer}>
          {imagesWRF.map((image, index) => (
            <button 
              key={index} 
              onClick={() => {
                setIndexWRF(index);
                handleImageClick(image);
              }}
              className={`${styles.imageButton} ${index === indexWRF ? styles.activeButton : ''}`}
            >
              {extractTimeFromFileName(image.split('/').pop())}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.imageContainer}>
        {imagesWRF.length > 0 && (
          <img 
            src={imagesWRF[indexWRF]} 
            alt={`Imagem WRF ${extractTimeFromFileName(imagesWRF[indexWRF].split('/').pop())}`} 
            className={styles.currentImage} 
            onClick={() => handleImageClick(imagesWRF[indexWRF])}
          />
        )}
      </div>
    </div>
  );
}
