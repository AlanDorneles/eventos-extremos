import { useEffect , useState} from "react";
import {  DataINMETAPI } from "../../services/inmet";
import { WiBarometer } from "react-icons/wi";
import styles from './card.module.css'

export const CardPressure = () => {
    const [pressure, setPressure] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
          try {
            const dataMeteorologic = await DataINMETAPI();
            setPressure(dataMeteorologic.pressure);
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

        const numbersWind = numbers.map(Number);

        const sum = numbersWind.reduce((acc, current) => acc + current, 0);
        console.log(sum)
        const average = sum / numbers.length;
        return average.toFixed(2);
    };

    const averageWindSpeed = calculateAverage(pressure);


    return(
        <div className={styles.container} >
            <p>Média da pressão instantânea</p> 
            <span className={styles.information}>
                <WiBarometer/>
                <p>{averageWindSpeed}bar</p>
            </span>
            

        </div>
    )
}