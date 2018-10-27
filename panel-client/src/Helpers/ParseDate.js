// Parse Date from database to a simpler format.
export const ParseDate = date => {
  date = new Date(date);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`
};
