import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
const PhenomenaContext = createContext();

export const PhenomenaProvider = ({ children }) => {
  const [phenomena, setPhenomena] = useState('pressure')
  const handleSelectChange = (selectedValue) => {
    setPhenomena(selectedValue);
  };
  const handleSelectSatelliteChange = (selectedValueSatellite) => {
    setPhenomena(selectedValueSatellite);
  }
  localStorage.setItem("phenomena", phenomena)

  return (
    <PhenomenaContext.Provider value={{ phenomena, handleSelectChange, handleSelectSatelliteChange }}>
      {children}
    </PhenomenaContext.Provider>
  );
};

export const usePhenomenaContext = () => {
  return useContext(PhenomenaContext);
};

PhenomenaProvider.propTypes = {
    children: PropTypes.object
}