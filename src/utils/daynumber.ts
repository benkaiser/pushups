const referenceDay = new Date(2000, 0, 0);
const oneDay = 1000 * 60 * 60 * 24;
export const dayNumber = (timeInMilli: number): number => {
  const offsetInMinutes = localStorage.getItem('offsetInMinutes');
  const diff = timeInMilli - Number(referenceDay) - (Number(offsetInMinutes) || 0) * 60 * 1000;
  return Math.floor(diff / oneDay);
}
