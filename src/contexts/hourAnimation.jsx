import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
const HourScopeContext = createContext();

export const HourScopeProvider = ({ children }) => {
  const [getHourScopeRadar, setHourScopeRadar] = useState(1);
  const [getHourScopeSatelite, setHourScopeSatelite] = useState(1);

  const handleSelectChange = (selectedValue) => {
    setHourScopeRadar(selectedValue);
  };
  const handleSelectSatelliteChange = (selectedValueSatellite) => {
    setHourScopeSatelite(selectedValueSatellite);
  };
  localStorage.setItem("hourScopeRadar", getHourScopeRadar)
  localStorage.setItem("hourScopeSatelite", getHourScopeSatelite)


  return (
    <HourScopeContext.Provider value={{ getHourScopeRadar, getHourScopeSatelite, handleSelectChange, handleSelectSatelliteChange }}>
      {children}
    </HourScopeContext.Provider>
  );
};

export const useHourScope = () => {
  return useContext(HourScopeContext);
};

export const useHourScopeSatelite = () => {
  return useContext(HourScopeContext);
};

HourScopeProvider.propTypes = {
  children: PropTypes.any
}