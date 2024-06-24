import { useFilterTypeRadarContext } from "../../contexts/typeRadar";
import { useContext,useState,useEffect} from "react";
import { useHourScope, useHourScopeSatelite } from "../../contexts/hourAnimation";
import styles from "./menuMap.module.css";
import { buttonStyle } from "../../constants/constants"; 
import PropTypes from "prop-types";
import { UseRadarIsChecked } from "../../contexts/radarIsChecked";
import { UsePreviousAndNextImage } from "../../contexts/previousAndNextImage";
import { useStationsVisible } from "../../contexts/radarFilter";
import { GiSattelite, GiRadarSweep } from "react-icons/gi";
import { useRadarOrSatelite } from "../../contexts/RadarOrSatelite";
import { Link } from "react-router-dom";
import { ButtonSatContext } from "../../contexts/buttonSat";
import { RiBaseStationLine } from "react-icons/ri";


export const MenuMap = ({ selectImage }) => {
  const { getHourScopeRadar, handleSelectChange } = useHourScope();
  const { getHourScopeSatelite, handleSelectSatelliteChange } = useHourScopeSatelite();
  const actualHour = new Date().getHours();
  const [initHour, setInitHour] = useState(actualHour - 6);
  const [setInitHourSatellite] = useState(actualHour - 1);

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
  const [selectedTab, setSelectTab] = useState('radar');
  const { handleTypeMecanism } = useRadarOrSatelite()

  const handleRadioButtonChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    handleTypeRadar(value);
  };

  const handleTabClick = (tab) => {
    setSelectTab(tab);
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

  const handleChangeSatellite = (event) => {
    const selectedValueSatellite = parseInt(event.target.value, 10);
    handleSelectSatelliteChange(selectedValueSatellite);
    const initIndexSatellite = actualHour - selectedValueSatellite;
    if (initIndexSatellite < 0) {
      initIndexSatellite * -1;
      setInitHourSatellite(initIndexSatellite);
    }
    
    setInitHourSatellite(initIndexSatellite);
  
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

  const { UFPEL, setUFPEL} = useContext(ButtonSatContext);

  const toggleUFPEL = () => setUFPEL(!UFPEL);

    useEffect(() => {
      handleTypeMecanism(selectedTab);
    }, [selectedTab, handleTypeMecanism]);

  return ( 
    <>
      <div className={styles.container}>
        <div>
          <div className={`tabs ${styles.containerTabs}`}>
            <ul>
              <li
                 className={`${selectedTab === 'radar' ? "is-active" : ""}`}
                 onClick={() => handleTabClick('radar')}
              >
                <Link to='/'>
                  <span className="icon is-small">
                    <GiRadarSweep />
                  </span>
                  <span>Radar</span>
                </Link>
              </li>
              <li
                className={`${selectedTab === 'satellite' ? "is-active" : ""}`}
                onClick={() => handleTabClick('satellite')}
              >
                <Link to='/satelite'>
                  <span className="icon is-small">
                    <GiSattelite className={styles.Icon} />
                  </span>
                  <span>Satélite</span>
                </Link>
              </li>

              <li  className={`${selectedTab === 'station' ? "is-active" : ""}`}
          onClick={() => handleTabClick('station')}>
                    <Link to='/estacoes'>
                  <span className="icon is-small">
                    <RiBaseStationLine className={styles.Icon} />
                  </span>
                  <span>Estações</span>
                </Link>

              </li>
            </ul>
          </div>
        </div>
        <div className={styles.containerItem}>
          {selectedTab === 'radar' && (
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
                              className="button is-small"
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
          )} 
          {selectedTab ==='satellite' && (
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
                <input type="radio" name="answer" checked={UFPEL} onChange={toggleUFPEL} />
                GOES16 - CH 14
              </label>
              <label className="radio">
                <input type="radio" name="answer" checked={!UFPEL} onChange={toggleUFPEL} />
                CPMet UFPEL
              </label>
            </div>
          )}
          {selectedTab ==='station' && (
            <div>
              MENU STATION
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
