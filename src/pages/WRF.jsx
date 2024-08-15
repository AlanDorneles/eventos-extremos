import { useState } from "react";
import styles from "./styles/wrf.module.css";

const WRF = () => {
  const [imagens, setImagens] = useState([]);

  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}${month}${day}`;

const carregarImagens = async () => {
  try {
    const response = await fetch(`http://localhost:3001/${formattedDate}/`);
    const data = await response.json();
    setImagens(data);
  } catch (error) {
    console.error("Erro ao carregar imagens:", error);
  }
};

  return (
    <div>
      <button onClick={carregarImagens}>Carregar Imagens</button>
      {imagens.map((imagem, index) => (
        <img key={index} src={imagem} className={styles.imge} alt="Imagem" />
      ))}
    </div>
  );
};

export default WRF;