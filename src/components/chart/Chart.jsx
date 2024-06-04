import ReactApexChart from "react-apexcharts";
import { useEffect, useState} from 'react';
import { DataINMETAPI } from '../../services/inmet';
import { useCodeStation } from "../../contexts/codeStation";
import { usePhenomenaContext } from "../../contexts/Phenomena";
import { variablesPT } from "./variablesPT";

export const Graphic = () => {
    const {phenomena} = usePhenomenaContext()
    const [variable, setVariable] = useState(null); 
    const [hour, setHour] = useState(null);
    const {codeStation} = useCodeStation()
    const storageCodeStation = localStorage.getItem('codeStation')
    const [trigger,setTrigger] = useState(false)
    const [nameVariable, setNameVariable] = useState('Pressão')
    

    useEffect(() => {
      if (codeStation !== storageCodeStation) {
        setTrigger(prevTrigger => !prevTrigger);
      }
    }, [codeStation, storageCodeStation]);


    useEffect(() => {
        const fetchData = async() => {
          try {
            
            const dataMeteorologic = await DataINMETAPI();
            setVariable(dataMeteorologic[0][phenomena]);
            setHour(dataMeteorologic[0].hour)
            setNameVariable(variablesPT[phenomena])
            console.log('aqui', dataMeteorologic[0])

          } catch (error) {
            console.error("Erro ao obter informações do radar:", error);
          }
        };
    
        fetchData();
      }, [trigger, phenomena]);




  const series = [{
    name: `${nameVariable}`,
    data: variable,
    colors:['#F8A402']
  }];

  const options = {
    title: {
      text: `${nameVariable }`,
      align: 'center', // ou 'left' ou 'right'
      style: {
        fontSize: '16px', // Tamanho da fonte
        color: '#333' // Cor do texto do título
      }
    },
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
        curve:'smooth',
        colors:['#F8A402']

    },
    markers:{
      size:8,
      content:"A"

    }
  
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line"  />
    </div>
  );
};
