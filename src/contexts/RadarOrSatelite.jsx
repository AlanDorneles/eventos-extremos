import { createContext, useContext, useState, } from 'react';
import PropTypes from 'prop-types';

export const RadarOrSatelite = createContext();
export const RadarOrSateliteProvider = ({ children }) => {

  const [typeMecanism, setTypeMecanism] = useState('radar')


  const handleTypeMecanism = (mecanism) => {
    setTypeMecanism(mecanism)
  }

  return (
    <RadarOrSatelite.Provider value={{ typeMecanism, setTypeMecanism, handleTypeMecanism}}>
      {children}
    </RadarOrSatelite.Provider>
  );
};

export const useRadarOrSatelite = () => {
    return useContext(RadarOrSatelite);
};
RadarOrSateliteProvider.propTypes = {
    children: PropTypes.any
}