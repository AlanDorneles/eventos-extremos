import React from 'react';
import styles from './menuMap.module.css'; 

interface SatelliteProps {
  getHourScopeSatelite: number;
  handleChangeSatellite: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  UFPEL: boolean;
  toggleUFPEL: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SatelliteMenu: React.FC<SatelliteProps> = ({
  getHourScopeSatelite,
  handleChangeSatellite,
  UFPEL,
  toggleUFPEL,
}) => {
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