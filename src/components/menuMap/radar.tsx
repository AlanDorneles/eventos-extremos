import { useHourScope } from '../../contexts/hourAnimation';
import styles from './menuMap.module.css';
import React from 'react';

interface RadarMenuProps {
    getHourScopeRadar: number;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    actualHour: number;
    initHour: number;
    clickedButtonId: number | null;
    selectIndex: (index: number) => void;
    buttonStyle: React.CSSProperties;
    cangucuChecked: boolean;
    handleCangucuChange: (checked: boolean) => void;
    morroDaIgrejaChecked: boolean;
    handleMorroDaIgrejaChange: (checked: boolean) => void;
    santiagoChecked: boolean;
    handleSantiagoChange: (checked: boolean) => void;
    selectedOption: string;
    handleRadioButtonChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
    handleCheckBoxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }


  const RadarMenu: React.FC<RadarMenuProps> = ({
    getHourScopeRadar,
    handleChange,
    actualHour,
    initHour,
    clickedButtonId,
    selectIndex,
    buttonStyle,
    cangucuChecked,
    handleCangucuChange,
    morroDaIgrejaChecked,
    handleMorroDaIgrejaChange,
    santiagoChecked,
    handleSantiagoChange,
    selectedOption,
    handleRadioButtonChange,
    isChecked,
    handleCheckBoxChange,
  
  }) => {

    return (

      <>
        <div className={styles.containerSelect}>
          <h6 className="title is-6">Horas</h6>
          <div className="select is-primary">
            <select
              id="selectAnimation"
              onChange={handleChange}
              value={getHourScopeRadar}
            >
              <option value={6}>6 horas</option>
              <option value={12}>12 horas</option>
              <option value={18}>18 horas</option>
              <option value={24}>24 horas</option>
            </select>
          </div>
        </div>
        <div className={styles.containerButtonHours}>
          <h6 className="title is-6">Mapa de horas</h6>
          <div style={{ display: "flex" }}>
            <div className="buttons" id="buttons">

              {Array.from({ length: getHourScopeRadar }, (_, index) => {
                const hour = index + initHour + 1;
                const isClicked = clickedButtonId === index;
                return (
                  <button
                    key={index}
                    className="button is-small"
                    onClick={() => selectIndex(index)}
                    id={index.toString()}
                    style={{ ...(isClicked && buttonStyle) }}
                  >
                    {hour < 0
                      ? `${(-24 - hour) * -1}:00 Dia Ant.`
                      : `${hour}:00`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.containerRadar}>
          <h6 className="title is-6">Radares</h6>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={cangucuChecked}
              onChange={(event) =>
                handleCangucuChange(event.target.checked)
              }
            />
            Canguçu - RS
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={morroDaIgrejaChecked}
              onChange={(event) =>
                handleMorroDaIgrejaChange(event.target.checked)
              }
            />
            Morro da Igreja - SC
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={santiagoChecked}
              onChange={(event) =>
                handleSantiagoChange(event.target.checked)
              }
            />
            Santiago - RS
          </label>
        </div>
        <div className={styles.containerRadar}>
          <h6 className="title is-6">Captação</h6>
          <label className="radio">
            <input
              name="typeRadio"
              type="radio"
              value="maxcappi"
              checked={selectedOption === "maxcappi"}
              onChange={handleRadioButtonChange}
            />
            maxcappi
          </label>
          <label className="radio">
            <input
              name="typeRadio"
              type="radio"
              value="10km"
              checked={selectedOption === "10km"}
              onChange={handleRadioButtonChange}
            />
            10km
          </label>
          <label className="radio">
            <input
              name="typeRadio"
              type="radio"
              value="07km"
              checked={selectedOption === "07km"}
              onChange={handleRadioButtonChange}
            />
            07km
          </label>
          {/* <label className="radio">
            <input
              name="typeRadio"
              type="radio"
              value="05km"
              checked={selectedOption === "05km"}
              onChange={handleRadioButtonChange}
            />
            05km
          </label> */}
          <label className="radio">
            <input
              name="typeRadio"
              type="radio"
              value="03km"
              checked={selectedOption === "03km"}
              onChange={handleRadioButtonChange}
            />
            03km
          </label>
        </div>
        <div className={styles.containerShowStation}>
          <h6 className="title is-6">Estações</h6>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckBoxChange}
            />
            Mostrar estações
          </label>
        </div>
      </>
    );
  };
  
  export default RadarMenu;