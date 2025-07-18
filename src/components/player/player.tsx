import { IoPlayCircleSharp, IoPlayForward, IoPlayBack, IoPauseCircleSharp } from "react-icons/io5";
import { useState } from "react";
import styles from './player.module.css';

interface PlayerProps {
  playGif: () => void;
  pauseGif: () => void;
  nextImage: () => void;
  previousImage: () => void;
}

export const Player = ({ playGif, pauseGif, nextImage, previousImage }: PlayerProps) => {
  const [isPlay, setIsPlay] = useState<boolean>(true);

  const handleToggleIcon = () => {
    setIsPlay(prev => !prev);
  };

  return (
    <div className={`block ${styles.block}`}>
      <div className={styles.container}>
        <IoPlayBack onClick={previousImage} className={styles.previous} />
        {isPlay ? (
          <IoPlayCircleSharp
            onClick={() => {
              playGif();
              handleToggleIcon();
            }}
            className={styles.play}
          />
        ) : (
          <IoPauseCircleSharp
            onClick={() => {
              handleToggleIcon();
              pauseGif();
            }}
            className={styles.pause}
          />
        )}
        <IoPlayForward onClick={nextImage} className={styles.next} />
      </div>
    </div>
  );
};
