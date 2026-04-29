declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "leaflet" {
  export type LatLngBoundsExpression = any;
  export type Map = any;
}

declare module "leaflet/dist/leaflet.css";
