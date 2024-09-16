import { useState, useEffect } from 'react';
import { wrfLocal } from '../../services/wrfLocal';
import nomeDasPastas from '../../../pastasWRF.json';
import { useWrfImageProvider } from '../../contexts/WrfImage';
import styles from '../../pages/styles/wrf.module.css';

const WRFmenu = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [datesOptions, setDatesOptions] = useState([]);
    const { setSelectedWrfImage, setImagesWRF } = useWrfImageProvider();
    const [imageTimes, setImageTimes] = useState([]);

    const extractTime = (imagePath) => {
        const regex = /_(\d{2})_(\d{2})_00\.png$/;
        const match = imagePath.match(regex);

        if (match) {
            const hour = match[1];
            const minute = match[2];
            return { time: `${hour}:${minute}`, imagePath };
        }
        return { time: 'Hora não encontrada', imagePath: null };
    };

    useEffect(() => {
        const formattedFolders = nomeDasPastas.folders.map(folder => {
            const formattedDate = `${folder.slice(6, 8)}/${folder.slice(4, 6)}/${folder.slice(0, 4)}`;
            return { name: formattedDate, date: folder };
        });
        setDatesOptions(formattedFolders);
    }, []);

    useEffect(() => {
        if (selectedDate) {
            const images = wrfLocal(selectedDate);
            setImagesWRF(images);

            if (images.length > 0) {
                setSelectedWrfImage(images[0]);
                const times = images.map(image => extractTime(image));
                setImageTimes(times);
            }
        }
    }, [selectedDate, setImagesWRF, setSelectedWrfImage]);

    const handleDateChange = (event) => {
        const selectedOption = datesOptions.find(option => option.name === event.target.value);
        setSelectedDate(selectedOption ? selectedOption.date : '');
    };

    return (
        <div className={styles.menu}>
            <select onChange={handleDateChange} value={datesOptions.find(option => option.date === selectedDate)?.name || ''}>
                <option value="">Selecione uma data</option>
                {datesOptions.map((option, index) => (
                    <option key={index} value={option.name}>{option.name}</option>
                ))}
            </select>

            <div className={styles.imageList}>
                {imageTimes.length > 0 && imageTimes.map(({ time, imagePath }, index) => (
                    <a key={index} href={imagePath} target="_blank" rel="noopener noreferrer">
                        <div className={styles.imageTime}>
                            {imagePath &&
                                <p>{time}</p>
                            }
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default WRFmenu;
