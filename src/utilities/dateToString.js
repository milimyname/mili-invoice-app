/*
 * Func to covert a date to a formatted date
 * (YY-MM-DD) -> DD MonthName YYYY
 * @param {string} date - date to conver
 * @return {string} string with a formatted date
 */

const dateToString = (date) => {
  const displayOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const newDate = new Date(date).toLocaleString("en-GB", displayOptions);
  return newDate;
};

export default dateToString;
