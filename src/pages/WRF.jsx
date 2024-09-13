import { useEffect, useState } from 'react';
import { useWrfImageProvider } from '../contexts/WrfImage';
import styles from './styles/wrf.module.css';

const WRFImageViewer = () => {
    const { selectedWrfImage, imagesWRF, setSelectedWrfImage } = useWrfImageProvider();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (imagesWRF.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % imagesWRF.length);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [imagesWRF]);

    useEffect(() => {
        if (imagesWRF.length > 0) {
            setSelectedWrfImage(imagesWRF[currentIndex]);
        }
    }, [currentIndex, imagesWRF, setSelectedWrfImage]);

    const handleImageClick = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    return (
        <div className={styles.imageContainer}>
            <img
                className={styles.currentImage}
                src={selectedWrfImage}
                onClick={() => handleImageClick(selectedWrfImage)}
            />
        </div>
    );
};

export default WRFImageViewer;
