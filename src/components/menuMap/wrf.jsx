import React, { useState, useEffect } from 'react';
import { wrfLocal } from '../../services/wrfLocal';
import nomeDasPastas from '../../../pastasWRF.json';
import { useWrfImageProvider } from '../../contexts/WrfImage';
import styles from '../../pages/styles/wrf.module.css';

const WRFmenu = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [datesOptions, setDatesOptions] = useState([]);
    const { setSelectedWrfImage, setImagesWRF } = useWrfImageProvider();

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
            setImagesWRF(images); // Armazena todas as imagens no contexto
            if (images.length > 0) {
                setSelectedWrfImage(images[0]); // Define a primeira imagem disponível
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
        </div>
    );
};

export default WRFmenu;
