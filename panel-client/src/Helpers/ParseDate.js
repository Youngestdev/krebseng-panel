// Parse Date from database to a simpler format.
export const ParseDate = date => {
  date = new Date(date);
  return `${date.getDay() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`
};
