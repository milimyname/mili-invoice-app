/*
 * Function to generate a random ID
 * Return string with 2 characters and 4 numbers (e.g KJ1212)
 * @return {string} String with ID.
 */

const generateID = () => {
  const idTemplate = ["K", "J", "1", "1", "1", "1"];
  const alphabetLength = 26;
  const alphabetArr = Array.from(
    Array(alphabetLength).map((_, index) => String.fromCharCode(index + 65))
  );

  const uid = idTemplate.map((_, index) => {
    if (index < 2)
      return alphabetArr[Math.floor(Math.random() * alphabetLength)];
    else return Math.floor(Math.random() * 10);
  });

  return uid.join("");
};

/*
 * Function to avoid the same id in the arr
 * Call generateID() and check if generateID is unique
 * @return {arr} arr - Check the arr
 * @return {string} String with a unique ID.
 */

const generateUniqueID = (arr) => {
  const allIDs = arr.map((item) => item.id);

  while (true) {
    let id = generateID();
    if (!allIDs.include(id)) return id;
  }
};

export default generateUniqueID;
