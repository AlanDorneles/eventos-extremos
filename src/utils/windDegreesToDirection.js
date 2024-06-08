export const windDegreesToDirection = (degree) => {
    let degreeNumber = Number(degree.VEN_DIR);
    if (degreeNumber > 0 && degreeNumber < 45) {
      return "NORTE";
    } else if (degreeNumber >= 45 && degreeNumber < 90) {
      return "NORDESTE";
    } else if (degreeNumber >= 90 && degreeNumber < 135) {
      return "LESTE";
    } else if (degreeNumber >= 135 && degreeNumber < 180) {
      return "SUDESTE";
    } else if (degreeNumber >= 180 && degreeNumber < 225) {
      return "SUL";
    } else if (degreeNumber >= 225 && degreeNumber < 270) {
      return "SUDOESTE";
    } else if (degreeNumber >= 270 && degreeNumber < 315) {
      return "OESTE";
    } else if (degreeNumber >= 315 && degreeNumber < 360) {
      return "NOROESTE";
    } else {
      return "NORTE"; // Caso o valor seja 360 graus (o equivalente a 0 graus)
    }
  };