import { useState, useEffect } from "react";
import { wrfLocal } from "../services/wrfLocal";
import styles from "./styles/Satellite.module.css";

export default function WRF() {
  const [selectedDate, setSelectedDate] = useState("");
  const [imagesWRF, setImagesWRF] = useState([]);
  const [indexWRF, setIndexWRF] = useState(0);
  const hoje = new Date();
  const dataFormatada = hoje.toISOString().split('T')[0]; // Formato AAAA-MM-DD
  const formattedDate = hoje.toLocaleDateString('pt-BR');
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  const oneDayAgoFormatted = oneDayAgo.toISOString().split('T')[0]; // Formato AAAA-MM-DD

  const formattedOneDayAgo = oneDayAgo.toLocaleDateString('pt-BR');

  const [datesOptions, setDatesOptions] = useState([
    { name: formattedDate, date: dataFormatada },
    { name: formattedOneDayAgo, date: oneDayAgoFormatted },
  ]);

  useEffect(() => {
    if (selectedDate) {
      const images = wrfLocal(selectedDate);
      setImagesWRF(images);
      setIndexWRF(0); // Reinicia o índice ao mudar a data
    }
  }, [selectedDate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndexWRF(prevIndex => (prevIndex + 1) % imagesWRF.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [imagesWRF.length]);

  const handleDateChange = (event) => {
    const selectedOption = datesOptions.find(option => option.name === event.target.value);
    setSelectedDate(selectedOption ? selectedOption.date : "");
  };

  return (
    <>
      <div className={styles.container}>
        <select onChange={handleDateChange} value={datesOptions.find(option => option.date === selectedDate)?.name || ""}>
          <option value="">Selecione uma data</option>
          {datesOptions.map((option, index) => (
            <option key={index} value={option.name}>{option.name}</option>
          ))}
        </select>
        {imagesWRF.length > 0 && (
          <img src={imagesWRF[indexWRF]} alt={`Imagem WRF ${indexWRF + 1}`} />
        )}
      </div>
    </>
  );
}