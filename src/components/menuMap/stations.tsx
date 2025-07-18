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
      ))}
    </div>
  );
};

export default StationsMenu;
