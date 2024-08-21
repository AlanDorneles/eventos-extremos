import { useState, useEffect } from "react";
import { wrfLocal } from "../services/wrfLocal";
import styles from "./styles/Satellite.module.css";
import nomeDasPastas from "../../pastasWRF.json";

export default function WRF() {
  const [selectedDate, setSelectedDate] = useState("");
  const [imagesWRF, setImagesWRF] = useState([]);
  const [indexWRF, setIndexWRF] = useState(0);
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
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
      const images = wrfLocal(selectedDate);
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

  return (
    <>
      <div className={styles.container}>
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
        {imagesWRF.length > 0 && !isNaN(indexWRF + 1) && (
          <img src={imagesWRF[indexWRF]} alt={`Imagem WRF ${indexWRF + 1}`} />
        )}
      </div>
    </>
  );
}
