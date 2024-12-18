export const formatNumber = (number: number): string => {
  return number < 10 ? '0' + number : number.toString();
};

export const getStyleNumber = (style: string): number => {
  return Number(style.replace('px', ''));
};
