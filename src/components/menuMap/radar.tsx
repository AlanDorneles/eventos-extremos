//import { useHourScope } from "../../contexts/hourAnimation";
import styles from "./menuMap.module.css";
import { RadarMenuProps } from "../../interfaces/RadarMenu";
import indexToTimeLabel from "../../utils/IndexToHour";

const RadarMenu: React.FC<RadarMenuProps> = ({
  getHourScopeRadar,
  handleChange,
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
            <option value={1}>1 hora</option>
            <option value={2}>2 horas</option>
            <option value={3}>3 horas</option>
          </select>
        </div>
      </div>
      <div className={styles.containerButtonHours}>
        <h6 className="title is-6">Mapa de horas</h6>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              <div className="buttons" id="buttons">
                {(() => {
                  const totalButtons = getHourScopeRadar * 6; // 6 imagens por hora
                  const nowUtc = new Date();
                  const frontTrimButtons = 2; // -20 min à frente
                  const currentUtcIndex =
                    (nowUtc.getUTCHours() * 6 +
                      Math.floor(nowUtc.getUTCMinutes() / 10)) %
                    144;
                  const adjustedCurrentIndex =
                    (currentUtcIndex - frontTrimButtons + 144) % 144;
                  const startIndex =
                    (adjustedCurrentIndex - (totalButtons - 1) + 144) % 144;

                  return Array.from({ length: totalButtons }, (_, i) => {
                    const index = (startIndex + i) % 144;
                    const displayTime = indexToTimeLabel(index);

                    const isClicked = clickedButtonId === index;

                    return (
                      <button
                        key={index}
                        id={index.toString()}
                        className={`button is-small is-primary${
                          isClicked ? "" : " is-outlined"
                        }`}
                        onClick={() => selectIndex(index)}
                        style={{ ...(isClicked && buttonStyle) }}
                      >
                        {displayTime}
                      </button>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.containerRadar}>
        <h6 className="title is-6">Radares</h6>
        <div className="checkboxes is-flex-direction-column">
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
  );
};

export default RadarMenu;
