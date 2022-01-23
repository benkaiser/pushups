const referenceDay = new Date(2000, 0, 0);
const oneDay = 1000 * 60 * 60 * 24;
export const dayNumber = (timeInMilli: number): number => {
  const diff = timeInMilli - Number(referenceDay);
  return Math.floor(diff / oneDay);
}
