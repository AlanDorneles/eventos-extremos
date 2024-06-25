import { useFilterTypeRadarContext } from "../../contexts/typeRadar";
import { useContext, useState, useEffect } from "react";
import {
  useHourScope,
  useHourScopeSatelite,
} from "../../contexts/hourAnimation";
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
import RadarMenu from "./radar";
import SatelliteMenu from "./satellite";

export const MenuMap = ({ selectImage }) => {
  const { getHourScopeRadar, handleSelectChange } = useHourScope();
  const { getHourScopeSatelite, handleSelectSatelliteChange } =
    useHourScopeSatelite();
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
  const [selectedTab, setSelectTab] = useState("radar");
  const { handleTypeMecanism } = useRadarOrSatelite();

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

  const { UFPEL, setUFPEL } = useContext(ButtonSatContext);

  const toggleUFPEL = () => setUFPEL(!UFPEL);

  useEffect(() => {
    handleTypeMecanism(selectedTab);
  }, [selectedTab, handleTypeMecanism]);

  return (
    <>
      <div className={styles.container}>
        <div>
          {/* TABS */}
          <div className={`tabs ${styles.containerTabs}`}>
            <ul>
              <li
                className={`${selectedTab === "radar" ? "is-active" : ""}`}
                onClick={() => handleTabClick("radar")}
              >
                <Link to="/">
                  <span className="icon is-small">
                    <GiRadarSweep />
                  </span>
                  <span>Radar</span>
                </Link>
              </li>

              <li
                className={`${selectedTab === "satellite" ? "is-active" : ""}`}
                onClick={() => handleTabClick("satellite")}
              >
                <Link to="/satelite">
                  <span className="icon is-small">
                    <GiSattelite className={styles.Icon} />
                  </span>
                  <span>Satélite</span>
                </Link>
              </li>

              <li
                className={`${selectedTab === "station" ? "is-active" : ""}`}
                onClick={() => handleTabClick("station")}
              >
                <Link to="/estacoes">
                  <span className="icon is-small">
                    <RiBaseStationLine className={styles.Icon} />
                  </span>
                  <span>Estações</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* MENUS */}

        {/* RADAR */}
        <div className={styles.containerItem}>
          {selectedTab === "radar" && (
            <RadarMenu
              getHourScopeRadar={getHourScopeRadar}
              handleChange={handleChange}
              actualHour={actualHour}
              initHour={initHour}
              clickedButtonId={clickedButtonId}
              selectIndex={selectIndex}
              buttonStyle={buttonStyle}
              cangucuChecked={cangucuChecked}
              handleCangucuChange={handleCangucuChange}
              morroDaIgrejaChecked={morroDaIgrejaChecked}
              handleMorroDaIgrejaChange={handleMorroDaIgrejaChange}
              santiagoChecked={santiagoChecked}
              handleSantiagoChange={handleSantiagoChange}
              selectedOption={selectedOption}
              handleRadioButtonChange={handleRadioButtonChange}
              isChecked={isChecked}
              handleCheckBoxChange={handleCheckBoxChange}
            />
          )}
          {selectedTab === "satellite" && (
            <SatelliteMenu
              getHourScopeSatelite={getHourScopeSatelite}
              handleChangeSatellite={handleChangeSatellite}
              UFPEL={UFPEL}
              toggleUFPEL={toggleUFPEL}
            />
          )}
          {selectedTab === "station" && (
            <div className={styles.containerOptionsStations}>
              <label>
                <input
                  type="checkbox"
                  value={"A826"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A826 - Alegrete
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={morroDaIgrejaChecked}
                  value={"A827"}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A827 - Bagé
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A840"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A840 - Bento Gonçalves
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A812"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A812 - Caçapava do Sul
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A838"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A838 - Camaquã
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A897"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A897 - Cambará do Sul
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A884"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A884 - Campo Bom
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A879"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A879 - Canela
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A811"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A811 - Canguçu
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A887"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A887 - Capão do Leão (Pelotas)
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A853"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A853 - Cruz Alta
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A881"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A881 - Dom Pedrito
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A893"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A893 - Encruzilhada do Sul
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A828"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A828 - Erechim
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A854"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A854 - Frederico Westphalen
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A883"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A883 - Ibirubá
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A828"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A836 - Jaguarão
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A844"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A844 - Lagoa Vermelha
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A878"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A878 - Mostardas
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A856"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A856 - Palmeiras das Missões
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A839"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A839 - Passo Fundo
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A801"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A801 - Porto Alegre( Jardim Botânico )
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A839"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A839 - Porto Alegre( Belém Novo )
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A839"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A839 - Porto Alegre( Belém Novo )
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A831"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A831 - Quaraí( Belém Novo )
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A802"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A802 - Rio Grande
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A813"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A813 - Rio Pardo
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A803"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A803 - Santa Maria
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A810"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A810 - Santa Rosa
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A804"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A804 - Santana do Livramento
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A833"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A833 - Santiago
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A805"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A805 - Santo Augusto
              </label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A830"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A830 - São Borja
              </label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A832"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A832 - São Gabriel
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A829"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A829 - São José dos Ausentes
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A852"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A852 - São Luíz Gonzaga
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A889"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A889 - São Vicente do Sul
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A894"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A894 - Serafina Corrêa
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A837"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A837 - Soledade
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A899"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A899 - Santa Vitória do Palmar ( Barra do Chuí )
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A882"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A882 - Teutônia
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A808"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A808 - Torres
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A834"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A834 - Tramandaí
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A886"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A886 - Tramandaí
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A809"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A809 - Uruguaiana
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  value={"A880"}
                  checked={morroDaIgrejaChecked}
                  onChange={(event) =>
                    handleMorroDaIgrejaChange(event.target.checked)
                  }
                />
                A880 - Vacaria
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
