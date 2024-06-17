import styles from './styles/Home.module.css';

const Windy = () => {
    return (
        <div className={styles.windyContainer}>
            <iframe src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=m/s&zoom=7&overlay=satellite&product=satellite&level=surface&lat=-29.6914&lon=-53.8008"></iframe>
        </div>
    );
};

export default Windy;