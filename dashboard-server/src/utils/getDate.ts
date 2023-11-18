export const getDate = (date: Date) =>
  `${date?.toLocaleDateString()} ${date?.toLocaleTimeString()}`;
