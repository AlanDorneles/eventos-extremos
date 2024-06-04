import { useState, useEffect } from 'react';
import { DataINMETAPI } from "../services/inmet.js";

export const useDataINMETEffect = () => {
  const [dataINMET, setDataINMET] = useState([]);

  const fetchData = async () => {
    try {
      const dataINMETResult = await DataINMETAPI();
      setDataINMET(dataINMETResult);
      console.log('novo:', dataINMETResult)
    } catch (error) {
      console.error("Erro ao obter informações do radar:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return dataINMET;
};