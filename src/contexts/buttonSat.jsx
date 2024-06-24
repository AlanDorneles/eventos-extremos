import { createContext, useState,useContext } from "react";
import PropTypes from "prop-types";

export const ButtonSatContext = createContext();

export const ButtonSatProvider = ({ children }) => {
    const [UFPEL, setUFPEL] = useState(true);
    const [INPE, setINPE] = useState(false);
    
    return (
        <ButtonSatContext.Provider value={{ UFPEL, setUFPEL, INPE, setINPE }}>
            {children}
        </ButtonSatContext.Provider>
    );
};

export const buttonSat = () => {
    return useContext(ButtonSatContext);
};

ButtonSatProvider.propTypes = {
    children: PropTypes.any
}