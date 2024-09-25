import { createContext, useContext, useState, } from 'react';
import PropTypes from 'prop-types';

export const ScopeDaysContext = createContext();

export const ScopeDaysProvider = ({ children }) => {
  const [scopeDays, setScopeDays] = useState(24)
  
  return (
    <ScopeDaysContext.Provider value={{ scopeDays,setScopeDays}}>
      {children}
    </ScopeDaysContext.Provider>
  );
};

export const useScopeDaysContext = () => {
    return useContext(ScopeDaysContext);
  };
ScopeDaysProvider.propTypes = {
    children: PropTypes.any
}