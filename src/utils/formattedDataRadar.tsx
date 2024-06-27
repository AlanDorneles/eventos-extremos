function formattedDataRadar(actualMonth: number, actualDay: number): { Month: string, Day: string } {
  let monthStr = actualMonth < 10 ? "0" + actualMonth : actualMonth.toString();
  let dayStr = actualDay < 10 ? "0" + actualDay : actualDay.toString();

  return { Month: monthStr, Day: dayStr };
}


export default formattedDataRadar