import { useEffect } from "react";
import styles from "./menuMap.module.css";
import { addMinutes } from "date-fns";
import { SatelliteMenuProps } from "../../interfaces/SatelliteMenu";
import { useImageContext } from "../../contexts/satImageUpdate";
import { useButtonSat } from "../../contexts/buttonSat"; // IMPORTANTE

const SatelliteMenu: React.FC<
  Omit<SatelliteMenuProps, "source" | "toggleSource">
> = ({
  getHourScopeSatelite,
  handleChangeSatellite,
  clickedButtonId,
  selectIndex,
  buttonStyle,
}) => {
  const { setImageIndex } = useImageContext();
  const { CPPMET, toggleSource } = useButtonSat();

  const source = CPPMET ? "CPPMET" : "INPE";

  useEffect(() => {
    const stepsPerHour = source === "INPE" ? 6 : 2;
    const intervalMinutes = 60 / stepsPerHour;
    const maxIndex = source === "INPE" ? 143 : 47;

    const now = addMinutes(new Date(), 150); // UTC +2h30
    const hour = now.getHours();
    const minute = now.getMinutes();

    let currentIndex =
      hour * stepsPerHour + Math.floor(minute / intervalMinutes);
    currentIndex = Math.min(maxIndex, currentIndex);

    setImageIndex(currentIndex);
  }, [source, setImageIndex]);

  return (
    <div className={styles.containerRadar}>
      {/* Seletor de Horas */}
      <div className={styles.containerSelect}>
        <h6 className="title is-6">Horas</h6>
        <div className="select is-primary">
          <select
            id="selectAnimation"
            onChange={handleChangeSatellite}
            value={getHourScopeSatelite}
          >
            {[1, 2, 3, 4, 5].map((h) => (
              <option key={h} value={h}>
                {h} hora{h > 1 && "s"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botões de Seleção de Imagem */}
      <div className={styles.containerImageSelectors}>
        <h6 className="title is-6">Seleção de Imagem</h6>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="buttons" id="buttons">
            {(() => {
              const stepsPerHour = source === "INPE" ? 6 : 2;
              const intervalMinutes = 60 / stepsPerHour;
              const totalButtons = getHourScopeSatelite * stepsPerHour;

              const now = addMinutes(new Date(), 150); // UTC +2h30min
              const currentHour = now.getHours();
              const currentMinute = now.getMinutes();

              let currentIndex =
                currentHour * stepsPerHour +
                Math.floor(currentMinute / intervalMinutes);
              const maxIndex = source === "INPE" ? 143 : 47;
              currentIndex = Math.min(maxIndex, currentIndex);

              const startIndex = Math.max(0, currentIndex - totalButtons + 1);

              return Array.from({ length: totalButtons }, (_, i) => {
                const index = startIndex + i;
                const hour = Math.floor(index / stepsPerHour);
                const minute = (index % stepsPerHour) * intervalMinutes;

                const displayMinuteOffset =
                  hour * 60 + minute + intervalMinutes;
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
                    onClick={() => {
                      selectIndex(index);
                      setImageIndex(index);
                    }}
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

      {/* Seletor de Satélite */}
      <h6 className="title is-6">Satélite</h6>
      <label className="radio">
        <input
          type="radio"
          name="source"
          value="INPE"
          checked={source === "INPE"}
          onChange={() => toggleSource("INPE")}
        />
        GOES19 - CH 16 (INPE)
      </label>
      <label className="radio">
        <input
          type="radio"
          name="source"
          value="CPPMET"
          checked={source === "CPPMET"}
          onChange={() => toggleSource("CPPMET")}
        />
        CPPMet UFPEL
      </label>
    </div>
  );
};

export default SatelliteMenu;
