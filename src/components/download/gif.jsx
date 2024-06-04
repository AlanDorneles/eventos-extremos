import { useState,useEffect } from 'react';
import styles from './gif.module.css'
import { MdOutlineFileDownload } from "react-icons/md";
import PropTypes from "prop-types";

export const DownloadGif = ({disabledButton}) => {
  const [disabled, setDisabled] = useState(disabledButton);

  useEffect(()=>{
    setDisabled(disabledButton)

  },[disabledButton])

  return (
    <>
      <div className={`block ${styles.block} `}>
        <button className={`${disabled ? styles.container : styles.disabled}`}>
        <MdOutlineFileDownload className={styles.icon} />
        <p>Download</p>
        </button>
      </div>
    </>
  );
};


DownloadGif.propTypes = {
  disabledButton: PropTypes.bool,
}