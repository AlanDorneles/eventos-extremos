import { UsePreviousAndNextImage } from "../../contexts/previousAndNextImage";

export const selectIndex = (index) => {
    const {setClickHoursIndexImage,indexImage}= UsePreviousAndNextImage()
    setClickHoursIndexImage(index)
    console.log('indice da imagem MenuMap',indexImage)

  };