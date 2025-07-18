// ImageContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Define os tipos para o contexto
type ImageContextType = {
  image: string | null;
  updateImage: (newImage: string) => void;
  imageIndex: number | null;
  setImageIndex: (index: number) => void;
};

// Tipo para as props do provider
interface ImageProviderProps {
  children: ReactNode;
}

// Cria o contexto com valor inicial indefinido
const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Provider
export const ImageProvider = ({ children }: ImageProviderProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  const updateImage = (newImage: string) => setImage(newImage);

  return (
    <ImageContext.Provider value={{ image, updateImage, imageIndex, setImageIndex }}>
      {children}
    </ImageContext.Provider>
  );
};

// Hook para consumir
export const useImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) throw new Error("useImageContext must be used within an ImageProvider");
  return context;
};
