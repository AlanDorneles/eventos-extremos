import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Definindo o contexto com um valor padrão
export const WrfImageContext = createContext({
    selectedWrfImage: '',
    setSelectedWrfImage: () => {},
    imagesWRF: [],
    setImagesWRF: () => {}
});

// Provider do contexto
export const WrfImageProvider = ({ children }) => {
    const [selectedWrfImage, setSelectedWrfImage] = useState('');
    const [imagesWRF, setImagesWRF] = useState([]);

    return (
        <WrfImageContext.Provider value={{ selectedWrfImage, setSelectedWrfImage, imagesWRF, setImagesWRF }}>
            {children}
        </WrfImageContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useWrfImageProvider = () => {
    return useContext(WrfImageContext);
};

// Definindo PropTypes para o Provider
WrfImageProvider.propTypes = {
    children: PropTypes.node.isRequired
};
