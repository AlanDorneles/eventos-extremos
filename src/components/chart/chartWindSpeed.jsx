import ReactApexChart from "react-apexcharts";
import { useEffect, useState} from 'react';
import { DataINMETAPI } from '../../services/inmet';
import { titleWindSpeed } from "./options";

export const GraphicWindSpeed = () => {
    const [windSpeed, setWindSpeed] = useState(null); 
    const [hour, setHour] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
          try {
            const dataMeteorologic = await DataINMETAPI();
            setWindSpeed(dataMeteorologic.windSpeed);
            setHour(dataMeteorologic.hour)
          } catch (error) {
            console.error("Erro ao obter informações do INMET:", error);
          }
        };
    
        fetchData();
      }, []);


  const series = [{
    name: 'Velocidade do vento',
    data: windSpeed,
  }
];

  const options = {
    ...titleWindSpeed,
    chart: {
      id: 'chart-line',
    },
    grid:{
        show:false
    },
    xaxis: {
      categories: hour,
      type:'string',
      tickAmount:4
    },
    stroke: {
        curve:'smooth'
    },
}

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={300} />
    </div>
  );
};
