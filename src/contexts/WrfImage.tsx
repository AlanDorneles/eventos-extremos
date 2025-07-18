// src/contexts/WrfImage.tsx
import React, { createContext, useContext, useState } from "react";
import { WrfImageContextType } from "../interfaces/WrfImage.ts";

export const WrfImageContext = createContext<WrfImageContextType | undefined>(
  undefined
);

export const WrfImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedWrfImage, setSelectedWrfImage] = useState<string>("");
  const [imagesWRF, setImagesWRF] = useState<string[]>([]); // ou [] se tipo desconhecido

  return (
    <WrfImageContext.Provider
      value={{ selectedWrfImage, setSelectedWrfImage, imagesWRF, setImagesWRF }}
    >
      {children}
    </WrfImageContext.Provider>
  );
};

export const useWrfImageProvider = () => {
  const context = useContext(WrfImageContext);
  if (!context)
    throw new Error(
      "useWrfImageProvider must be used within a WrfImageProvider"
    );
  return context;
};
