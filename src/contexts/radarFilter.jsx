import { createContext, useContext, useState, } from 'react';
import PropTypes from 'prop-types';

export const StationsVisibleContext = createContext();

export const StationsVisibleProvider = ({ children }) => {
  const [stationsVisible, setStationsVisible] = useState(true)

  return (
    <StationsVisibleContext.Provider value={{ stationsVisible, setStationsVisible }}>
      {children}
    </StationsVisibleContext.Provider>
  );
};

export const useStationsVisible = () => {
    return useContext(StationsVisibleContext);
  };
StationsVisibleProvider.propTypes = {
    children: PropTypes.any
}