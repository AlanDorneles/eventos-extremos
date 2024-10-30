import React, { useEffect } from 'react';
import styles from "./menuMap.module.css";
import { stations } from '../../constants/stations';
import { useCheckedsContext } from '../../contexts/Checkeds';

const StationsMenu: React.FC = () => {
  const { checkeds, setCheckeds} = useCheckedsContext();

  const handleCheckedStation = (id: string, checked: boolean) => {
    setCheckeds(prevCheckeds => 
      checked ? [...prevCheckeds, id] : prevCheckeds.filter(checkedId => checkedId !== id)
    );
  };

  return (
<<<<<<< HEAD
    <div className={styles.menu}>
      {stations.map((station) => (
        <div key={station.id}>
          <label>
            <input
              type="checkbox"
              checked={checkeds.includes(station.id)}
              onChange={(e) => {handleCheckedStation(station.id, e.target.checked)}}
            />
            {station.name}
          </label>
        </div>
=======
    <div className={styles.containerOptionsStations}>
       {stations.map(station => (
        <label key={station.id} className="checkbox">
          <input
            type="checkbox"
            value={station.id}
            checked={checkeds[station.id] || false }
            onChange={(event) => handleCheckedStation(station.id, event.target.checked)}
          />
          {station.name}
        </label>
>>>>>>> 37e708fadd32d4676da5c6e0f48978de633286f6
      ))}
    </div>
  );
};

export default StationsMenu;
