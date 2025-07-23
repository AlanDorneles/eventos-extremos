import styles from "./MenuStation.module.css";
import { usePhenomenaContext } from "../../contexts/Phenomena";
import {useScopeDaysContext } from "../../contexts/ScopeDays";
import { useState } from "react";

export const MenuStation = () => {
  const { phenomena, handleSelectChange } = usePhenomenaContext();
  const {setScopeDays} = useScopeDaysContext()
  const [activeTab, setActiveTab] = useState(1)

  const handlePhenomena = (event) => {
    const selectedValue = event.target.value;
    handleSelectChange(selectedValue);
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber); 
    setScopeDays(tabNumber*24); 
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerSelect}>
          <p>Parâmetro</p>
          <div className="select is-primary">
            <select onChange={handlePhenomena} value={phenomena}>
              <option value={"pressure"}>Pressão</option>
              <option value={"rain"}>Precipitação Total (mm)</option>
              <option value={"tempMin"}>Temperatura Mínima (ºC)</option>
              <option value={"tempMax"}>Temperatura Máxima (ºC)</option>
              <option value={"humidity"}>Umidade (%)</option>
              <option value={"degree"}>Direção do Vento (º)</option>
              <option value={"windSpeed"}>Velocidade do vento (m/s)</option>
              <option value={"windBurst"}>Rajada de vento (m/s)</option>
            </select>
          </div>
        </div>
        <div className="is-flex-direction-row is-justify-content-center is-align-content-center">
          <div className="tabs">
            <ul>
            <li className={activeTab === 1 ? 'is-active' : ''} onClick={() => handleTabClick(1)}>
                <a className="is-size-7">1 dia</a>
              </li>
              <li className={activeTab === 3 ? 'is-active' : ''} onClick={() => handleTabClick(3)}>
                <a className="is-size-7">3 dias</a>
              </li>
              <li className={activeTab === 7 ? 'is-active' : ''} onClick={() => handleTabClick(7)}>
                <a className="is-size-7">7 dias</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
