import { useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Hook para rastrear acesso à página
 * Usa uma API de geolocalização gratuita para obter o país
 */
export const useAccessTracking = () => {
  useEffect(() => {
    const trackAccess = async () => {
      try {
        // Obtém informações de geolocalização (IP + país)
        // Usando a API gratuita ip-api.com (10k requests/mês grátis)
        const geoResponse = await fetch('https://ip-api.com/json/?fields=query,country,countryCode', {
          method: 'GET'
        });

        if (!geoResponse.ok) {
          console.warn('Erro ao obter geolocalização');
          return;
        }

        const geoData = await geoResponse.json();
        const { country, countryCode } = geoData;

        // Envia o acesso para o backend
        const response = await fetch(`${API_URL}/track-access`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            country,
            countryCode,
          }),
        });

        if (response.ok) {
          console.log('Acesso registrado com sucesso');
        } else {
          console.warn('Erro ao registrar acesso');
        }
      } catch (error) {
        console.error('Erro ao rastrear acesso:', error);
        // Não falha a aplicação se o rastreamento falhar
      }
    };

    // Rastreia o acesso quando o componente monta
    trackAccess();
  }, []);
};
