import React, { createContext, useContext, useState } from "react";

type WrfImagesContextType = {
  images: string[];
  setImages: (imgs: string[]) => void;

  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

const WrfImagesContext = createContext<WrfImagesContextType | undefined>(
  undefined
);

export const WrfImagesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <WrfImagesContext.Provider
      value={{ images, setImages, currentIndex, setCurrentIndex }}
    >
      {children}
    </WrfImagesContext.Provider>
  );
};

export const useWrfImages = (): WrfImagesContextType => {
  const ctx = useContext(WrfImagesContext);
  if (!ctx) throw new Error("useWrfImages must be used within WrfImagesProvider");
  return ctx;
};
