export default function formattedDataRadar(actualMonth, actualDay) {
  if (actualMonth < 10) {
    actualMonth = "0" + actualMonth;
  }

  if (actualDay < 10) {
    actualDay = "0" + actualDay;
  }

  return {Month : actualMonth, Day: actualDay}
}
