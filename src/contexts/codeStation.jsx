import { createContext, useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export const CodeStationsContext = createContext();

export const CodeStationsProvider = ({ children }) => {
  const [codeStation, setCodeStation] = useState('A887')
  useEffect(() => {
    localStorage.setItem('codeStation', codeStation);
  }, [codeStation]);
  
  return (
    <CodeStationsContext.Provider value={{ codeStation, setCodeStation }}>
      {children}
    </CodeStationsContext.Provider>
  );
};

export const useCodeStation = () => {
    return useContext(CodeStationsContext);
  };
CodeStationsProvider.propTypes = {
    children: PropTypes.any
}