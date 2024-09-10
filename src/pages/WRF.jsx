import React, { useEffect, useState } from 'react';
import { useWrfImageProvider } from '../contexts/WrfImage';
import styles from './styles/wrf.module.css';

const WRFImageViewer = () => {
    const { selectedWrfImage, imagesWRF, setSelectedWrfImage } = useWrfImageProvider();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (imagesWRF.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % imagesWRF.length);
            }, 1000); // Mudar imagem a cada 1 segundo

            return () => clearInterval(interval); // Limpar o intervalo ao desmontar
        }
    }, [imagesWRF]);

    useEffect(() => {
        if (imagesWRF.length > 0) {
            setSelectedWrfImage(imagesWRF[currentIndex]); // Atualiza a imagem exibida
        }
    }, [currentIndex, imagesWRF, setSelectedWrfImage]);

    if (imagesWRF.length === 0) {
        return <div>No images available.</div>;
    }

    if (!selectedWrfImage) {
        return <div>No image selected.</div>;
    }

    const handleImageClick = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    return (
        <div className={styles.imageContainer}>
            <img
                src={selectedWrfImage}
                alt="WRF Image"
                className={styles.image}
                onClick={() => handleImageClick(selectedWrfImage)}
            />
        </div>
    );
};

export default WRFImageViewer;
