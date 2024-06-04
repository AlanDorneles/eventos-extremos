import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
const HourScopeContext = createContext();

export const HourScopeProvider = ({ children }) => {
  const [getHourScope, setHourScope] = useState(6);


  const handleSelectChange = (selectedValue) => {
    setHourScope(selectedValue);
  };
  localStorage.setItem("hourScope", getHourScope)


  return (
    <HourScopeContext.Provider value={{ getHourScope, handleSelectChange }}>
      {children}
    </HourScopeContext.Provider>
  );
};

export const useHourScope = () => {
  return useContext(HourScopeContext);
};

HourScopeProvider.propTypes = {
    children: PropTypes.any
}