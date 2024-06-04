import styles from "./MenuSatelite.module.css";
import PropTypes from "prop-types";

export const MenuSatelite = ({ selectedOption, onOptionChange}) => {

  const handleRadioButtonChange = (event) => {
    const { value } = event.target;
    onOptionChange(value);
    console.log(value);
  };

  return (
    <div className={styles.container}>
      <div className="control">
        <div className={styles.containerOption}>
          <label className="radio">
            <input
              type="radio"
              name="answer"
              value={"realçada"}
              checked={selectedOption === "realçada"}
              onChange={handleRadioButtonChange}
            />
            INFRA-VERMELHO REALÇADA
          </label>
        </div>
        <div className={styles.containerOption}>
          <label className="radio">
            <input
              type="radio"
              name="answer"
              value={"ir"}
              checked={selectedOption === "ir"}
              onChange={handleRadioButtonChange}
            />
            INFRA-VERMELHO
          </label>
        </div>
        <div className={styles.containerOption}>
          <label className="radio">
            <input
              type="radio"
              name="answer"
              value={"vis"}
              checked={selectedOption === "vis"}
              onChange={handleRadioButtonChange}
            />
            VISÍVEL
          </label>
        </div>
      </div>
      <div>
        </div>
      {/*<div className="control">
        <div className={styles.containerOption}>
          <label className="radio">
            <input type="radio" name="answer" value={'AS'} checked
             
            />
            AMERICA DO SUL
          </label>
        </div>
        <div className={styles.containerOption}>
          <label className="radio">
            <input type="radio" name="answer" value={'BR'}  />
            BRASIL
          </label>
        </div>
        <div className={styles.containerOption}>
          <label className="radio">
            <input type="radio" name="answer" value={'S'}   />
            SUL
          </label>
        </div>
  </div>*/}
    </div>
  );
};
MenuSatelite.propTypes = {
  selectedOption: PropTypes.string,
  onOptionChange: PropTypes.func,
};
