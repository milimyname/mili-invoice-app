/*
 * Func to convert string to object. It needs to convert e.g a given date '2021-12-04'
 * to '2021,12,04' because the new Date() func doesn't work wih it.
 * and then we create a date instance
 * @param {object} date - date string
 * @return {object} new Date obj
 */

const convertStToDateObject = (date) =>
  typeof date === "object"
    ? new Date(date)
    : new Date(date.replaceAll("-", ","));

/*
 * Func to generate a payment due date based on created date and terms = days
 * Func adds days to created date.
 * Returns new date obj
 * @param {object} createdDate - Date object
 * @param {number} days - number of days to add
 * @return {object} new Date obj
 */

const generatePatmentDueDate = (createdDate, days) => {
  // miliseconds = days * hours * minutes * seconds * miliseconds
  const daysToMilliseconds = parseInt(days) * 24 * 60 * 60 * 1000;
  const paymendDue = new Date(
    convertStToDateObject(createdDate).getTime() + daysToMilliseconds
  );
  return paymendDue;
};

export default generatePatmentDueDate;
