export interface StationData {
  pressure: (string | null)[];
  hour: string[];
  windDirection: string[];
  windSpeed: (string | null)[];
  rain: (string | null)[];
  tempMin: (string | null)[];
  tempMax: (string | null)[];
  windBurst: (string | null)[];
  humidity: (string | null)[];
  name: string[];
  degree: (string | null)[];
  data: string[];
  station: any;
  }
  
  export interface INMETDataRaw {
  [stationCode: string]: StationData;
}