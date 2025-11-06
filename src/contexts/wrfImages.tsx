import React, { createContext, useContext, useState } from "react";

type WrfImagesContextType = {
  images: string[];
  setImages: (imgs: string[]) => void;
};

const WrfImagesContext = createContext<WrfImagesContextType | undefined>(undefined);

export const WrfImagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<string[]>([]);

  console.log("%c[WrfContext] Provider renderizado", "color: #00aaff");
  console.log("%c[WrfContext] Estado atual das imagens:", "color: #00aaff", images);

  return (
    <WrfImagesContext.Provider value={{ images, setImages }}>
      {children}
    </WrfImagesContext.Provider>
  );
};

export const useWrfImages = (): WrfImagesContextType => {
  const ctx = useContext(WrfImagesContext);

  if (!ctx) {
    console.error(
      "%c[WrfContext] ERRO: useWrfImages foi usado FORA do WrfImagesProvider!",
      "color: red; font-weight: bold;"
    );
    throw new Error("useWrfImages must be used within WrfImagesProvider");
  }

  console.log("%c[WrfContext] useWrfImages acessado. Images:", "color: #ffaa00", ctx.images);

  return ctx;
};

export default WrfImagesProvider;
