import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const FilterTypeRadarContext = createContext();

export const FilterTypeRadarProvider = ({ children }) => {
  const [typeRadar, setTypeRadar] = useState("maxcappi");
  var radarLocalStorage = JSON.parse(localStorage.getItem("redemet-images"));

  const handleTypeRadar = (selectedValue) => {
    setTypeRadar(selectedValue);
    radarLocalStorage = radarLocalStorage[selectedValue];
  };

  return (
    <FilterTypeRadarContext.Provider
      value={{ typeRadar, setTypeRadar, handleTypeRadar, radarLocalStorage }}
    >
      {children}
    </FilterTypeRadarContext.Provider>
  );
};

export const useFilterTypeRadarContext = () => {
  return useContext(FilterTypeRadarContext);
};
FilterTypeRadarProvider.propTypes = {
  children: PropTypes.any,
};
