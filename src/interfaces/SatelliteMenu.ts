export interface SatelliteMenuProps {
  getHourScopeSatelite: number;
  handleChangeSatellite: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  clickedButtonId: number | null;
  selectIndex: (index: number) => void;
  buttonStyle: React.CSSProperties;
}
