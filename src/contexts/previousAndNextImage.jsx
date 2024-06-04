import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'

const PreviousAndNextImage = createContext();

export const PreviousAndNextImageProvider = ({ children }) => {

    const[indexImage, setIndexImage] = useState(0)
    const hourScope = JSON.parse(localStorage.getItem('hourScope'))

    const handleNextImage =  (index) => {
        localStorage.setItem('imageId', index)
        setIndexImage(index)
        if(indexImage > hourScope){
            setIndexImage(0)
        }
  

    }

    const handlePreviousImage = (index) => {
        if (indexImage <= 0) {
            setIndexImage(hourScope);
            
        } else {
            setIndexImage(index - 1);
        }
    };

    const setClickHoursIndexImage = (index) => {
        setIndexImage(index)

    }
    const imageCount = {
        indexImage,handleNextImage, handlePreviousImage, setClickHoursIndexImage
    }


    return (
        <PreviousAndNextImage.Provider value={imageCount}>
          {children}
        </PreviousAndNextImage.Provider>
      );


}

export const UsePreviousAndNextImage = () => {
    return useContext(PreviousAndNextImage );
  };
PreviousAndNextImageProvider.propTypes = {
    children: PropTypes.node,

  }