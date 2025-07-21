import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GiSattelite, GiRadarSweep } from "react-icons/gi";
import { RiBaseStationLine } from "react-icons/ri";
import RadarMenu from "./radar";
import SatelliteMenu from "./satellite";
import StationsMenu from "./stations";
import stations, { Station } from "./listStations";
import {
  useHourScope,
  useHourScopeSatelite,
} from "../../contexts/hourAnimation";
import { useFilterTypeRadarContext } from "../../contexts/typeRadarContext";
import { UseRadarIsChecked } from "../../contexts/radarIsChecked";
import { UsePreviousAndNextImage } from "../../contexts/previousAndNextImage";
import { useStationsVisible } from "../../contexts/radarFilter";
import { useRadarOrSatelite } from "../../contexts/RadarOrSatelite";
import { buttonStyle } from "../../constants/constants";
import styles from "./menuMap.module.css";
import { useLocation } from "react-router-dom";

interface MenuMapProps {
  selectImage?: () => void;
}

const MenuMap: React.FC<MenuMapProps> = ({ selectImage }) => {
  const { getHourScopeRadar, handleSelectChange } = useHourScope();
  const { getHourScopeSatelite, handleSelectSatelliteChange } =
    useHourScopeSatelite();
  const {
    handleCangucuChange,
    handleMorroDaIgrejaChange,
    handleSantiagoChange,
    cangucuChecked,
    morroDaIgrejaChecked,
    santiagoChecked,
  } = UseRadarIsChecked();
  const { setClickHoursIndexImage, indexImage } = UsePreviousAndNextImage();
  const { setStationsVisible } = useStationsVisible();
  const { handleTypeRadar } = useFilterTypeRadarContext();
  const { handleTypeMecanism } = useRadarOrSatelite();
  const actualHour = new Date().getHours();
  const [initHour, setInitHour] = useState<number>(actualHour - 6);
  const [initHourSatellite, setInitHourSatellite] = useState<number>(
    actualHour - 1
  );
  const [clickedButtonId, setClickedButtonId] = useState<number | null>(null);
  const [checkeds, setCheckeds] = useState<{ [key: string]: boolean }>({});
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("maxcappi");
  const location = useLocation();

  const getTabFromPath = (pathname: string): string => {
    if (pathname.includes("satelite")) return "satellite";
    if (pathname.includes("estacoes")) return "station";
    if (pathname.includes("wrf")) return "wrf";
    return "radar";
  };

  const [selectedTab, setSelectTab] = useState<string>(
    getTabFromPath(location.pathname)
  );
  const [source, setSource] = useState<"CPPMET" | "INPE">("INPE");

  const handleCheckedStation = (id: string, checked: boolean) => {
    setCheckeds((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSelectedOption(value);
    handleTypeRadar(value);
  };

  useEffect(() => {
    setSelectTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  const handleTabClick = (tab: string) => {
    setSelectTab(tab);
  };


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    handleSelectChange(selectedValue);
    const initIndex = actualHour - selectedValue;

    if (initIndex < 0) {
      setInitHour(initIndex);
    } else {
      setInitHour(initIndex);
    }
    selectIndex(0);
  };

  const handleChangeSatellite = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValueSatellite = parseInt(event.target.value, 10);
    handleSelectSatelliteChange(selectedValueSatellite);
    const initIndexSatellite = actualHour - selectedValueSatellite;
    if (initIndexSatellite < 0) {
      setInitHourSatellite(initIndexSatellite * -1);
    } else {
      setInitHourSatellite(initIndexSatellite);
    }
    selectIndex(0);
  };

  const selectIndex = (index: number) => {
    setClickHoursIndexImage(index);

    if (selectImage) {
      selectImage();
    }
    setClickedButtonId(indexImage);
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
    setStationsVisible(!checked);
  };

  useEffect(() => {
    handleTypeMecanism(selectedTab);
  }, [selectedTab, handleTypeMecanism]);

  return (
    <div className={styles.container}>
      <div>
        {/* TABS */}
        <div className={`tabs ${styles.containerTabs}`}>
          <ul>
            <li
              className={`${selectedTab === "radar" ? "is-active" : ""}`}
              onClick={() => handleTabClick("radar")}
            >
              <Link to="/produtos/radar">
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
              <Link to="/produtos/satelite">
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
              <Link to="/produtos/estacoes">
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
      <div className={styles.containerItem}>
        {/* RADAR */}
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

        {/* ESTAÇÕES */}
        {selectedTab === "station" && (
          <StationsMenu
            checkeds={checkeds}
            handleCheckedStation={handleCheckedStation}
            stations={stations as Station[]}
          />
        )}

        {/* SATELLITE */}
        {selectedTab === "satellite" && (
          <SatelliteMenu
            getHourScopeSatelite={getHourScopeSatelite}
            handleChangeSatellite={handleChangeSatellite}
            source={source}
            toggleSource={(value) => setSource(value)}
            clickedButtonId={clickedButtonId}
            selectIndex={selectIndex}
            buttonStyle={buttonStyle}
          />
        )}
      </div>
    </div>
  );
};

export default MenuMap;
