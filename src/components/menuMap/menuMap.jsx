import { useFilterTypeRadarContext } from "../../contexts/typeRadar";
import { useState,useEffect} from "react";
import { useHourScope } from "../../contexts/hourAnimation";
import styles from "./menuMap.module.css";
import { buttonStyle } from "../../constants/constants"; 
import PropTypes from "prop-types";
import { UseRadarIsChecked } from "../../contexts/radarIsChecked";
import { UsePreviousAndNextImage } from "../../contexts/previousAndNextImage";
import { useStationsVisible } from "../../contexts/radarFilter";
import { GiSattelite, GiRadarSweep } from "react-icons/gi";
import { useRadarOrSatelite } from "../../contexts/RadarOrSatelite";
import { Link } from "react-router-dom";
import { MenuSatelite } from "../menuSatelite/MenuSatelite";

export const MenuMap = ({ selectImage }) => {
  const { getHourScope, handleSelectChange } = useHourScope();
  const actualHour = new Date().getHours();
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
  const { setClickHoursIndexImage, indexImage } = UsePreviousAndNextImage();
  const [isChecked, setIsChecked] = useState(false);
  const { setStationsVisible } = useStationsVisible();
  const [selectedOption, setSelectedOption] = useState("maxcappi");
  const { handleTypeRadar } = useFilterTypeRadarContext();
  const [selectTab, setSelectTab] = useState({ radar: true, sattelite: false});
  const { handleTypeMecanism } = useRadarOrSatelite()

  const handleRadioButtonChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    handleTypeRadar(value);
  };

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

    setClickedButtonId(indexImage);
  };

  const handleCheckBoxChange = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);
    setStationsVisible(isChecked);
  };

  const toggleTabs = () => {
    setSelectTab((prevState) => ({
      radar: !prevState.radar,
      sattelite: !prevState.sattelite,
    }));};

    useEffect(() => {
      const selectedMecanism = selectTab.radar ? 'radar' : 'satelite';
      handleTypeMecanism(selectedMecanism);
    }, [selectTab, handleTypeMecanism]);

  return ( 
    <>
      <div className={styles.container}>
        <div>
          <div className={`tabs ${styles.containerTabs}`}>
            <ul>
              <li
                className={`${selectTab.radar ? "is-active" : ""}`}
                onClick={toggleTabs}
              >
                <Link to='/'>
                  <span className="icon is-small">
                    <GiRadarSweep />
                  </span>
                  <span>Radar</span>
                </Link>
              </li>
              <li
                className={`${selectTab.sattelite ? "is-active" : ""}`}
                onClick={toggleTabs}
              >
                <Link to='/satelite'>
                  <span className="icon is-small">
                    <GiSattelite className={styles.Icon} />
                  </span>
                  <span>Satélite</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.containerItem}>
          {selectTab.radar ? (
            <>
              <div className={styles.containerSelect}>
                <h6 className="title is-6">Horas</h6>
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
                <h6 className="title is-6">Mapa de horas</h6>
                <div style={{ display: "flex" }}>
                  <div className="buttons" id="buttons">
                    {/* initHour = hora de inicio 
                    actualHour = hora atual
                     */}
                    {Array.from(
                      { length: actualHour - initHour },
                      (_, index) => {
                        const hour = index + initHour + 1;
                        const isClicked = clickedButtonId === index;
                        return (
                          <>
                            <button
                              className=" button is-small"
                              onClick={() => {
                                selectIndex(index);
                              }}
                              id={index}
                              style={{ ...(isClicked && buttonStyle) }}
                            >
                              {hour < 0
                                ? `${(-24 - hour) * -1}:00 Dia Ant.`
                                : `${hour}:00`}
                            </button>
                          </>
                        );
                      }
                    )}
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
                <h6 className="title is-6">Tipo de Radar</h6>

                <label className="radio">
                  <input
                    name="typeRadio"
                    type="radio"
                    value="maxcappi"
                    checked={selectedOption === "maxcappi"}
                    onChange={handleRadioButtonChange}
                  />
                  <p>maxcappi</p>
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
                <label className="radio">
                  <input
                    name="typeRadio"
                    type="radio"
                    value="05km"
                    checked={selectedOption === "05km"}
                    onChange={handleRadioButtonChange}
                  />
                  05km
                </label>
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
          ) : (
            <div className={styles.containerRadar}>
              <div className={styles.containerSelect}>
                <h6 className="title is-6">Horas</h6>
                <div className="select is-primary">
                  <select
                    id="selectAnimation"
                    onChange={handleChange}
                    value={getHourScope}
                  >
                    <option value={1}>1 hora</option>
                    <option value={2}>2 horas</option>
                    <option value={3}>3 horas</option>
                  </select>
                </div>
              </div>
              <h6 className="title is-6">Satélite</h6>
              <label className="radio">
                <input type="radio" name="answer" />
                GOES16 - True Color
              </label>
              <label className="radio">
                <input type="radio" name="answer" />
                GOES16 - Canal 13
              </label>
              <label className="radio">
                <input type="radio" name="answer" />
                GOES16 - Day Cloud Phase
              </label>
            </div>
          )}
        </div>
      </div>
      </>
  );
};
MenuMap.propTypes = {
  selectImage: PropTypes.func,
};
