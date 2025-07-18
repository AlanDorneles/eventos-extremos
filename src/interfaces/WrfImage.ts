// src/interfaces/WrfImage.ts
export interface WrfImageContextType {
  selectedWrfImage: string;
  setSelectedWrfImage: (value: string) => void;
  imagesWRF: string[]; // ou o tipo real das imagens
  setImagesWRF: (value: string[]) => void;
}
