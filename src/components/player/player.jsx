import { IoPlayCircleSharp,IoPlayForward,IoPlayBack,IoPauseCircleSharp  } from "react-icons/io5";
import { useState } from "react";
import PropTypes from 'prop-types'; 
import styles from  './player.module.css'

export const Player = ({playGif, pauseGif, nextImage, previousImage}) => {
    const [isPlay, setIsPlay] = useState(true)

    const handleToggleIcon= () => {
        if(isPlay === false){
            setIsPlay(true)
        }else{
            setIsPlay(false)
        }
    }
  
    return(
    <div className={`block ${styles.block}`}>
        <div className={styles.container}>
            <IoPlayBack onClick={previousImage} className={styles.previous}/>
            {isPlay? <IoPlayCircleSharp onClick={() => {playGif(), handleToggleIcon()}} className={styles.play}/>
            : <IoPauseCircleSharp onClick={() => {handleToggleIcon(), pauseGif()}} className={styles.pause}/>}
            <IoPlayForward onClick={nextImage} className={styles.next}/>
        </div>
    </div>
    )
}

Player.propTypes = {
    playGif:PropTypes.func,
    pauseGif:PropTypes.func,
    nextImage:PropTypes.func,
    previousImage:PropTypes.func,
}