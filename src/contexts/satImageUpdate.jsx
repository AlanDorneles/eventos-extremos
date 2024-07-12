// Context.js
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [image, setImage] = useState(null);

  const updateImage = (newImage) => {
    setImage(newImage);
  };

  return (
    <ImageContext.Provider value={{ image, updateImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
    return useContext(ImageContext);
};
ImageProvider.propTypes = {
    children: PropTypes.any
}