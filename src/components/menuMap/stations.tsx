import React from 'react';
import styles from "./menuMap.module.css";
import { Station } from './listStations';

interface StationProps {
  checkeds: { [key: string]: string };
  handleCheckedStation: (id:string, checked:boolean) => void;
  stations: Station[]
}

const StationsMenu = React.FC<StationProps> = ({
  checkeds,
  handleCheckedStation,
  stations
}) => {
  return (
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
      ))}
    </div>
  );
};

export default StationsMenu;
