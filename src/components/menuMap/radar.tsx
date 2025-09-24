//import { useHourScope } from "../../contexts/hourAnimation";
import styles from "./menuMap.module.css";
import { RadarMenuProps } from "../../interfaces/RadarMenu";
import { addMinutes } from "date-fns";

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
                  const now = addMinutes(new Date(), 150); // ⏰ Adiciona 2h30min (UTC + 2h30)

                  const currentHour = now.getHours();
                  const currentMinute = now.getMinutes();

                  // Índice da imagem mais recente
                  let currentIndex =
                    currentHour * 6 + Math.floor(currentMinute / 10);
                  currentIndex = Math.min(143, currentIndex); // Máximo 144 imagens por dia (0–143)

                  const startIndex = Math.max(
                    0,
                    currentIndex - totalButtons + 1
                  );

                  return Array.from({ length: totalButtons }, (_, i) => {
                    const index = startIndex + i;

                    const hour = Math.floor(index / 6);
                    const minute = (index % 6) * 10;

                    // ⏱️ Exibe +10 minutos no botão (imagem prevista)
                    const displayMinuteOffset = hour * 60 + minute + 10;
                    const displayHour = Math.floor(displayMinuteOffset / 60);
                    const displayMinute = displayMinuteOffset % 60;
                    const displayTime = `${String(displayHour).padStart(
                      2,
                      "0"
                    )}:${String(displayMinute).padStart(2, "0")}`;

                    const isClicked = clickedButtonId === index;

                    return (
                      <button
                        key={index}
                        id={index.toString()}
                        className="button is-small is-primary is-outlined"
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
