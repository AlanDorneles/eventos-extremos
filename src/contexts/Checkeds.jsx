import { createContext, useContext, useState, } from 'react';
import PropTypes from 'prop-types';

export const CheckedsContext = createContext();

export const CheckedsProvider = ({ children }) => {
  const [checkeds, setCheckeds] = useState([])
  
  return (
    <CheckedsContext.Provider value={{ checkeds,setCheckeds}}>
      {children}
    </CheckedsContext.Provider>
  );
};

export const useCheckedsContext = () => {
    return useContext(CheckedsContext);
  };
CheckedsProvider.propTypes = {
    children: PropTypes.any
}