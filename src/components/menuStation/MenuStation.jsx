import styles from './MenuStation.module.css'
import { usePhenomenaContext } from "../../contexts/Phenomena"

export const MenuStation = () =>{
    const {phenomena, handleSelectChange} = usePhenomenaContext()

    const handlePhenomena = () => {
        const selectedValue = event.target.value;
        handleSelectChange(selectedValue);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerSelect}>
                    <p>Parâmetro</p>
                    <div className="select is-primary">
                        <select onChange={handlePhenomena} value={phenomena}>
                            <option value={'pressure'}>Pressão</option>
                            <option value={'rain'}>Precipitação Total (mm)</option>
                            <option value={'tempMin'}>Temperatura Mínima (ºC)</option>
                            <option value={'tempMax'}>Temperatura Máxima (ºC)</option>
                            <option value={'humidity'}>Umidade (%)</option>
                            <option value={'degree'}>Direção do Vento (º)</option>
                            <option value={'windSpeed'}>Velocidade do vento (m/s)</option>
                            <option value={'windBurst'}>Rajada de vento (m/s)</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}