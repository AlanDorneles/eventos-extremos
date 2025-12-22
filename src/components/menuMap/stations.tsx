import styles from "./menuMap.module.css";
import { stations } from '../../constants/stations';
import { useCheckedsContext } from '../../contexts/Checkeds';
import { useEffect, useMemo, useRef, useState} from "react";
import {getUnique} from "../../services/getUnique";

const StationsMenu: React.FC = () => {
  const { checkeds, setCheckeds} = useCheckedsContext();
  const selectAllRef = useRef<HTMLInputElement>(null);

  const [pane, setPane] = useState<string[]>([]);

  const loadUnique = async () => {
    await getUnique(); // grava no localStorage
    const raw = localStorage.getItem("unique");
    try {
      setPane(raw ? JSON.parse(raw) : []);
    } catch {
      setPane([]);
    }
  };

  // TRIGGER: roda ao montar e a cada 60 min
  useEffect(() => {
    loadUnique();

    const id = setInterval(() => {
      loadUnique();
    }, 60 * 60 * 1000);

    return () => clearInterval(id);
  }, []);


  const handleCheckedStation = (id: string, checked: boolean) => {
    setCheckeds(prevCheckeds => 
      checked ? [...prevCheckeds, id] : prevCheckeds.filter(checkedId => checkedId !== id)
    );
  };

  
   
  const allIds = useMemo(() => stations.map(s => s.id), []);
  const allChecked = checkeds.length > 0 && checkeds.length === allIds.length;
  const someChecked = checkeds.length > 0 && checkeds.length < allIds.length;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someChecked && !allChecked;
    }
  }, [someChecked, allChecked]);

   const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Marcar todas
      setCheckeds(allIds);
    } else {
      // Desmarcar todas (remover todos os dados selecionados)
      setCheckeds([]);
    }
  };

  return (
    <div className={styles.menu}>
       <div>
        <label>
          <input
            type="checkbox"
            ref={selectAllRef}
            checked={allChecked}         // não inicia marcado; só marca quando todas estiverem marcadas
            onChange={handleToggleAll}
          />{" "}
          Selecionar todas
        </label>
      </div>
      {stations.map((station) => (
  <div key={station.id}>
    <label>
      <input
        type="checkbox"
        checked={checkeds.includes(station.id)}
        onChange={(e) => handleCheckedStation(station.id, e.target.checked)}
      />

      {" "}
      {pane.includes(station.id) ? (
        <>
          {station.name}{" "}
          <span className="tag is-danger is-rounded is-small has-text-white">PANE</span>
        </>
      ) : (
        station.name
      )}
    </label>
  </div>
))}
    </div>
  );
};

export default StationsMenu;
