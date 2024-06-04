import { useState } from "react";
import { useHourScope } from "../../contexts/hourAnimation";
import styles from "./menuMap.module.css";
import { buttonStyle } from "../../constants/constants";
import PropTypes from "prop-types";
import { UseRadarIsChecked } from "../../contexts/radarIsChecked";
import { UsePreviousAndNextImage } from "../../contexts/previousAndNextImage";
import { MdClose } from "react-icons/md";
import { useStationsVisible } from "../../contexts/radarFilter";
import LogoFurg from "../../../public/logo-furg.png";

export const MenuMap = ({ selectImage }) => {
  const { getHourScope, handleSelectChange } = useHourScope();
  const actualHour = new Date().getHours();
  console.log(`hora atual:`, actualHour)
  const [initHour, setInitHour] = useState(6);
  const [clickedButtonId, setClickedButtonId] = useState();
  const {
    handleCangucuChange,
    handleMorroDaIgrejaChange,
    handleSantiagoChange,
    cangucuChecked,
    morroDaIgrejaChecked,
    santiagoChecked,
  } = UseRadarIsChecked();
  const [isChecked, setIsChecked] = useState(false);
  const { setStationsVisible } = useStationsVisible();
  const handleCheckBoxChange = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);
    setStationsVisible(isChecked);
  };
  const { setClickHoursIndexImage, indexImage } = UsePreviousAndNextImage();

  const handleChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    handleSelectChange(selectedValue);
    const initIndex = actualHour - selectedValue;

    if (initIndex < 0) {
      initIndex * -1;
      setInitHour(initIndex);
    }

    setInitHour(initIndex);
    selectIndex(0);
  };
  const selectIndex = (index) => {
    setClickHoursIndexImage(index);
    selectImage();
    //console.log("indice da imagem MenuMap", indexImage);
    setClickedButtonId(indexImage);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerLogo}>
          <img src={LogoFurg} className={styles.logo} />
          <p>Monitoramento de eventos extremos</p>
        </div>
        <button className={`button is-danger is-small ${styles.close}`}>
          <MdClose />
        </button>
        <div className={styles.containerSelect}>
          <p>Horas</p>
          <div className="select is-primary">
            <select
              id="selectAnimation"
              onChange={handleChange}
              value={getHourScope}
            >
              <option value={6}>6 horas</option>
              <option value={12}>12 horas</option>
              <option value={18}>18 horas</option>
              <option value={24}>24 horas</option>
            </select>
          </div>
        </div>
        <div className={styles.containerButtonHours}>
          <p>Mapa de horas</p>

          <div style={{ display: "flex" }}>
            <div className="buttons" id="buttons">
              {Array.from({ length: actualHour - initHour }, (_, index) => {
                console.log(length)
                const hour = index + initHour + 1;
                const isClicked = clickedButtonId === index;
                return (
                  
                    <button
                      className={`button is-outlined is-small ${styles.button}`}
                      onClick={() => {
                        selectIndex(index);
                      }}
                      id={index}
                      style={{ ...(isClicked && buttonStyle) }}
                      key={`button_${index}`}
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
          <p className={styles.title}>Radares</p>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={cangucuChecked}
              onChange={(event) => handleCangucuChange(event.target.checked)}
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
              onChange={(event) => handleSantiagoChange(event.target.checked)}
            />
            Santiago - RS
          </label>
        </div>
        <div className={styles.containerRadar}>
          <p className={styles.title}>Estações</p>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckBoxChange}
            />
            Mostrar estações
          </label>
        </div>
      </div>
    </>
  );
};
MenuMap.propTypes = {
  selectImage: PropTypes.func,
};
