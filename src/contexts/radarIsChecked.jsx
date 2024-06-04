// hourAnimation.js (ou outro nome mais apropriado)
import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'

const RadarIsChecked = createContext();

export const RadarIsCheckedProvider = ({ children }) => {
  const [cangucuChecked, setCangucuChecked] = useState(true);
  const [morroDaIgrejaChecked, setMorroDaIgrejaChecked] = useState(true);
  const [santiagoChecked, setSantiagoChecked] = useState(true);

  const handleCangucuChange = (prevChecked) => {

    setCangucuChecked(prevChecked);
  };

  const handleMorroDaIgrejaChange = (prevChecked) => {
    setMorroDaIgrejaChecked(prevChecked);
  };

  const handleSantiagoChange = (prevChecked) => {
    setSantiagoChecked(prevChecked);
  };

  const radarChecked = {
    cangucuChecked,
    morroDaIgrejaChecked,
    santiagoChecked,
    handleCangucuChange,
    handleMorroDaIgrejaChange,
    handleSantiagoChange,
  };

  return (
    <RadarIsChecked.Provider value={radarChecked}>
      {children}
    </RadarIsChecked.Provider>
  );
};

export const UseRadarIsChecked = () => {
  return useContext(RadarIsChecked);
};

RadarIsCheckedProvider.propTypes = {
  children: PropTypes.node
}