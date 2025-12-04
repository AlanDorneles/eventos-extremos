function indexToTimeLabel(index: number): string {
  if (index == null || index < 0) return "--:--";

  const minutesTotal = index * 10; // 10 min por índice
  const hours = Math.floor(minutesTotal / 60);
  const minutes = minutesTotal % 60;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");

  return `${hh}:${mm}`; // ex: "03:20"
}
export default indexToTimeLabel;