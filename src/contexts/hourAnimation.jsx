import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
const HourScopeContext = createContext();

export const HourScopeProvider = ({ children }) => {
  const [getHourScopeRadar, setHourScopeRadar] = useState(6);
  const [getHourScopeSatelite, setHourScopeSatelite] = useState(1);


  const handleSelectChange = (selectedValue) => {
    setHourScopeRadar(selectedValue);
  };
  const handleSelectSatelliteChange = (selectedValue) => {
    setHourScopeSatelite(selectedValue);
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