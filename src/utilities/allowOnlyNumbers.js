/*
 * Func allows an user to enter only numbers. If the user enters something else,
 * the typed ones'll be cut off. If we only have a character and it's not a number, we return 0.
 * @param {string} value - string to convert
 * @return {string} String with a new number
 */

const allowOnlyNumbers = (value) => {
  if (isNaN(Number(value))) {
    if (value.length <= 1) return 0;
    else return value.slice(0, -1);
  }

  return value;
};

export default allowOnlyNumbers;
