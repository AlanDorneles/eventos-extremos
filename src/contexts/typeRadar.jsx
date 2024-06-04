import { createContext, useContext, useState, } from 'react';
import PropTypes from 'prop-types';

export const FilterTypeRadarContext = createContext();

export const FilterTypeRadarProvider = ({ children }) => {
  const [typeRadar, setTypeRadar] = useState('maxcappi')

  const handleTypeRadar = (selectedValue) => {
    setTypeRadar(selectedValue);
    console.log(selectedValue)
  };

  return (
    <FilterTypeRadarContext.Provider value={{ typeRadar, setTypeRadar, handleTypeRadar}}>
      {children}
    </FilterTypeRadarContext.Provider>
  );
};

export const useFilterTypeRadarContext = () => {
    return useContext(FilterTypeRadarContext);
};
FilterTypeRadarProvider.propTypes = {
    children: PropTypes.any
}