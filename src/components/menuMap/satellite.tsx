import React, { useState } from 'react';
import styles from './menuMap.module.css';
import { CPPMETImages } from '../../services/cpmetUFPEL';
import { CPTECImages } from '../../services/cptecINPE';
import { useImageContext } from "../../contexts/satImageUpdate";

interface SatelliteProps {
  getHourScopeSatelite: number;
  handleChangeSatellite: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  UFPEL: boolean;
  toggleUFPEL: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ImageButtonProps {
  imageUrl: string;
}

const SatelliteMenu: React.FC<SatelliteProps> = ({
  getHourScopeSatelite,
  handleChangeSatellite,
  UFPEL,
  toggleUFPEL,
}) => {
  
  const extractDateTime = (url: string): string => {
    const regexINPE = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/;
    const regexUFPEL = /(\d{4})_(\d{2})_(\d{2})_(\d{2})_(\d{2})/;
    let match = UFPEL ? url.match(regexUFPEL) : url.match(regexINPE);
  
    if (url.includes('ufpel')) {
      match = url.match(regexUFPEL);
      const [, , , , hour, minute] = match;
      return `${hour}:${minute}`;
    }

    if (url.includes('inpe')) {
      match = url.match(regexINPE);
      const [, , , , hour, minute] = match;
      return `${hour}:${minute}`;
    }
  
    return 'Data/Hora não encontrada';
  };

  const images: string[] = UFPEL ? CPTECImages() : CPPMETImages();
  const { updateImage } = useImageContext();
  const filteredImages = images.filter(image => !image.includes('cdn'));

  const handleImageClick = (index: number) => {
    const imageUrl = filteredImages[index].toString();
    const dateTime = extractDateTime(imageUrl);
    console.log(`Hora da imagem: ${dateTime}`);
    updateImage(imageUrl);
    window.open(imageUrl, '_blank');
  };

  return (
    <div className={styles.containerRadar}>
      <div className={styles.containerSelect}>
        <h6 className="title is-6">Horas</h6>
        <div className="select is-primary">
          <select
            id="selectAnimation"
            onChange={handleChangeSatellite}
            value={getHourScopeSatelite}
          >
            <option value={1}>1 hora</option>
            <option value={2}>2 horas</option>
            <option value={3}>3 horas</option>
          </select>
        </div>
      </div>
      <div className={styles.containerImageSelectors}>
        <h6 className="title is-6">Seleção de Imagem</h6>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="button-group" id="imageSelectors">
            {filteredImages.map((imageUrl, index) => (
              <button
                key={index}
                className="button is-small"
                onClick={() => handleImageClick(index)}
              >
                {extractDateTime(imageUrl)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <h6 className="title is-6">Satélite</h6>
      <label className="radio">
        <input
          type="radio"
          name="answer"
          checked={UFPEL}
          onChange={toggleUFPEL}
        />
        GOES16 - CH 14
      </label>
      <label className="radio">
        <input
          type="radio"
          name="answer"
          checked={!UFPEL}
          onChange={toggleUFPEL}
        />
        CPMet UFPEL
      </label>
    </div>
  );
};

export default SatelliteMenu;