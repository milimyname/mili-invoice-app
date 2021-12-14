/*
 * Func to check email using redex if it's correct.
 * @param {strin} email - string with email address
 * @return {boolean} return true or false
 */

const validateEmail = (email) => {
  const redex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return redex.test(email);
};

/*
 * Func to validate form. Iterate through each property of given object with user inputed values
 * and return errors if it doesn't match criterias
 * @param {object} objectToValidate - object with form inputs values
 * @param {func} handleSetErrors - state handler
 * @return {boolean}  return true or false
 */

const validateForm = (objectToValidate, handleSetErrors) => {
  let errs = {};
  let msgs = [];

  for (const propertyName in objectToValidate) {
    const propertyValue = objectToValidate[propertyName];

    // Skip one loop if propertyName is 'paymentDue'
    if (propertyName === "paymentDue") continue;

    // If property is 'clientEmial', validate propertyValue with validateEmail()
    // if the email is invalid, add error to errs object. Otherwise, skip the loop.
    if (propertyName === "clientEmail") {
      if (!validateEmail(propertyValue)) {
        errs = { ...errs, [propertyName]: true };
        msgs.push("- This email must be correct!");
      }
      continue;
    }

    // If propertyValue is empty, add error to errs object.
    if (propertyValue === "") {
      errs = { ...errs, [propertyName]: true };
      msgs.push("- All fields must have filled out!");
    }

    // If propertyValue is arr, check if its lenght is 0. If so, add error. Otherwise,
    // iterate over every object in the arr and for each object iterate throught properties
    // Check if the property value is empty, add error, else add error with value of false
    if (Array.isArray(propertyValue)) {
      let arr = [];
      let obj = {};

      if (propertyValue.length === 0) {
        errs = { ...errs, items: true };
        msgs.push("- An item must be added");
      } else {
        propertyValue.forEach((object) => {
          for (let property in object) {
            if (object[property] === "") {
              obj = { ...obj, [property]: true };
              msgs.push("- All fields must be added");
            } else {
              obj = { ...obj, [property]: false };
            }
          }

          // If object have one or more keys push them in obj arr and
          // then add error with propertyName assigned with value of arr
          if (Object.keys(obj).length !== 0) {
            arr.push(obj);
            errs = { ...errs, [propertyName]: arr };
          }
        });
      }
    }

    // Check if propertyValue is an object and ain't an array. Then iterate through each property
    // in propertyValue object and check if propertyValue[property] is empty. If so, add an error
    if (typeof propertyValue === "object" && !Array.isArray(propertyValue)) {
      for (let property in propertyValue) {
        if (propertyValue[property] === "") {
          errs = {
            ...errs,
            [propertyName]: { ...errs[propertyName], [property]: true },
          };
          msgs.push("- All fields must be added!");
        }
      }
    }
  }

  if (Object.keys(errs).length === 0) {
    return true;
  } else if (
    Object.keys(errs).length === 1 &&
    Object.keys(errs)[0] === "items"
  ) {
    if (!Array.isArray(errs.items)) {
      handleSetErrors(...new Set(msgs));
      return false;
    }
    let arr = [];
    errs.items.forEach((obj) => {
      for (let prop in obj) {
        arr.push(obj[prop]);
      }
    });

    if (arr.includes(true)) {
      handleSetErrors(...new Set(msgs));
      return false;
    } else return true;
  } else {
    handleSetErrors(...new Set(msgs));
    return false;
  }
};

export default validateForm;
