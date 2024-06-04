import { useEffect , useState} from "react";
import { DataINMETAPI } from "../../services/inmet";
import { WiStrongWind } from "react-icons/wi";
import styles from './card.module.css'
import { FiClock } from "react-icons/fi";

export const CardWind= () => {
    const [wind, setWind] = useState(null);
    const [hour, setHour] = useState(null) 

    useEffect(() => {
        const fetchData = async() => {
          try {
            const dataMeteorologic = await DataINMETAPI();
            setWind(dataMeteorologic.windSpeed);
            setHour(dataMeteorologic.hour)
          } catch (error) {
            console.error("Erro ao obter informações do INMET:", error);
          }
        };
    
        fetchData();
      }, []);

      const calculateAverage = (numbers) => {
        if (!numbers || numbers.length === 0) {
            return 0; // Retorna 0 se a lista estiver vazia ou não existir
        }

        const stringToNumbersWind = numbers.map(Number);

        const sum = stringToNumbersWind.reduce((acc, current) => acc + current, 0);
        const average = (sum / numbers.length).toFixed(2);
        const maxWindSpeed = Math.max(...stringToNumbersWind)
        const minWindSpeed = Math.min(...stringToNumbersWind)

        const maxIndexOf = stringToNumbersWind.indexOf(maxWindSpeed)
        const minIndexOf = stringToNumbersWind.indexOf(minWindSpeed)
        const hourMaxWindSpeed = hour[maxIndexOf]
        const hourMinWindSpeed = hour[minIndexOf]
        return {average,maxWindSpeed, minWindSpeed, hourMaxWindSpeed, hourMinWindSpeed};
    };

    const averageWindSpeed = calculateAverage(wind);


    return(
        <div className={styles.container} >
            <div>
                <p>Média da velocidade do vento</p> 
                <span className={styles.information}>
                    <WiStrongWind/>
                    <p>{averageWindSpeed.average}m/s</p>
                </span>
            </div>
            <div className={styles.containerMaxMin}>
                <span>
                    <p>Máximo</p>
                    <div className={styles.hourAndValue}>
                        <p>
                            {averageWindSpeed.maxWindSpeed}m/s
                        </p>

                        <span>
                            <FiClock/>
                            {averageWindSpeed.hourMaxWindSpeed}
                        </span>
                    </div>
                </span>
                <span >
                    <p>Mínimo</p>
                    <div className={styles.hourAndValue}>
                        <p>
                            {averageWindSpeed.minWindSpeed}m/s
                        </p>
                        <span>
                            <FiClock/>
                            {averageWindSpeed.hourMinWindSpeed}
                        </span>
                    </div>
               
                </span>
            </div>
          
            

        </div>
    )
}