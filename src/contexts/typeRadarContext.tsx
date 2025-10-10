import { createContext, useContext, useState, ReactNode } from "react";
import { RadarProductKey, RedemetImages } from "../interfaces/RadarImageSet";

interface FilterTypeRadarContextType {
  typeRadar: RadarProductKey;
  setTypeRadar: (value: RadarProductKey) => void;
  handleTypeRadar: (value: RadarProductKey) => void;
  radarLocalStorage: RedemetImages;
}

export const FilterTypeRadarContext = createContext<
  FilterTypeRadarContextType | undefined
>(undefined);

// 💠 Provider tipado
export const FilterTypeRadarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [typeRadar, setTypeRadar] = useState<RadarProductKey>("maxcappi");

  const raw = localStorage.getItem("redemet-images");
  const parsed = raw
    ? (JSON.parse(raw) as RedemetImages)
    : { "03km": [], "07km": [], "10km": [], "maxcappi": [] };
  const radarLocalStorage = parsed;

  const handleTypeRadar = (selectedValue: RadarProductKey) => {
    setTypeRadar(selectedValue);
    // não atualiza `radarLocalStorage` dinamicamente, pois estático — pode ser melhorado
  };

  return (
    <FilterTypeRadarContext.Provider
      value={{ typeRadar, setTypeRadar, handleTypeRadar, radarLocalStorage }}
    >
      {children}
    </FilterTypeRadarContext.Provider>
  );
};

// ✅ Hook com verificação
export const useFilterTypeRadarContext = (): FilterTypeRadarContextType => {
  const context = useContext(FilterTypeRadarContext);
  if (!context) {
    throw new Error(
      "useFilterTypeRadarContext deve ser usado dentro de FilterTypeRadarProvider"
    );
  }
  return context;
};
