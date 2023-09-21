let _ = require("lodash");
const moment = require("moment-timezone");

/**
 * Helpers
 */

module.exports = {
  /**
   * Calculate how many ms remains from original timeout
   * @param timeout function timeout in ms (waiting can't exceed this value)
   * @param execStarted time when function started to wait
   * @returns {number}
   */
  remainingTimeout: (timeout, execStarted) =>
    timeout - (+new Date() - execStarted),

  /**
   * Return the 1st day of an upcoming month
   * @param {number} offset - number of upcoming months to be offset; default is 1
   * @returns {string} - 1st day of an upcoming month ex. 10/1/2020
   */
  getUpcomingMonth(offset = 1) {
    let d = new Date(),
      monthStart,
      currentMonth = d.getMonth() + 1 + offset, //Months are zero based
      currentYear = d.getFullYear();
    // Offset the year when the month is greater than 12
    currentMonth < 13
      ? (monthStart = currentMonth + "/1/" + currentYear)
      : (monthStart =
          (currentMonth % 12) + "/1/" + (currentYear + ~~(currentMonth / 12)));
    return monthStart;
  },

  /**
   * Check whether the array is sorted ascending
   * @returns {boolean}
   * @param {array} arr
   */
  isAscendingSort(arr) {
    let flag = true;
    for (let i = 0; i <= arr.length - 2; i++) {
      let amountA = parseInt(arr[i], 10);
      let amountB = parseInt(arr[i + 1], 10);
      if (!(amountA <= amountB)) {
        flag = false;
        break;
      }
    }
    return flag;
  },

  /**
   * Check whether the array is sorted Descending
   * @returns {boolean}
   * @param {array} arr
   */
  isDescendingSort(arr) {
    let flag = true;
    for (let i = 0; i <= arr.length - 2; i++) {
      let amountA = parseInt(arr[i], 10);
      let amountB = parseInt(arr[i + 1], 10);
      if (!(amountA >= amountB)) {
        flag = false;
        break;
      }
    }
    return flag;
  },

  /**
   * Check whether the array is sorted alphabetically
   * @returns {boolean}
   * @param {array} arr
   */
  isAlphabetSort(arr) {
    let flag = true;
    for (let i = 0; i <= arr.length - 2; i++) {
      if (!(arr[i] <= arr[i + 1])) {
        flag = false;
        break;
      }
    }
    return flag;
  },

  /**
   * Check whether the array is sorted  reverse alphabetically
   * @returns {boolean}
   * @param {array} arr
   */
  isAlphabetReverseSort(arr) {
    let flag = true;
    for (let i = 0; i <= arr.length - 2; i++) {
      if (!(arr[i] >= arr[i + 1])) {
        flag = false;
        break;
      }
    }
    return flag;
  },

  /**
   * Compares shared properties of two objects and returns false if any of them doesn't match
   * @param one {object}
   * @param two {object}
   * @returns {boolean}
   */
  objectsPartiallyMatch(one, two) {
    let propertiesOfOne = Object.keys(one),
      propertiesOfTwo = Object.keys(two),
      matchingProperties = [],
      result = true;

    if (propertiesOfOne.length === 0 || propertiesOfTwo.length === 0)
      return false;

    for (let i = 0; i < propertiesOfOne.length; i++) {
      if (propertiesOfTwo.includes(propertiesOfOne[i])) {
        matchingProperties.push(propertiesOfOne[i]);
      }
    }

    for (let i = 0; i < matchingProperties.length; i++) {
      if (one[matchingProperties[i]] !== two[matchingProperties[i]]) {
        console.log(
          `'${matchingProperties[i]}' property: ${
            one[matchingProperties[i]]
          } !== ${two[matchingProperties[i]]}`
        );
        result = false;
      }
    }

    return result;
  },



  /**
   * Get 10 random numbers that doesn't start with 0
   * @returns {number}
   */
  generatePhone() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  },

  /**
   * Get string with a stream of random letters
   * @param length
   * @returns {string|string}
   */
  getRandomLetters(length) {
    let letters = "abcdefghijklmnopqrstuvwxyz",
      str = "";

    for (let i = 0; i < length; i++) {
      str += letters[Math.floor(Math.random() * letters.length)];
    }

    return str;
  },

  /**
   * Generate random email
   * @param {number} length
   * @param {string} domain
   * @returns {string|string}
   */
  generateEmail(length, domain = "mailsac.com") {
    let letters = "abcdefghijklmnopqrstuvwxyz0123456789",
      str = "";

    for (let i = 0; i < length; i++) {
      str += letters[Math.floor(Math.random() * letters.length)];
    }

    return `${str}@${domain}`;
  },

  /**
   * @param {Array} arr
   */
  isSortedByDate(arr) {
    let flag = true;
    for (let i = 0; i <= arr.length - 2; i++) {
      let date1 = new Date(arr[i]);
      let date2 = new Date(arr[i + 1]);
      if (!(date1 <= date2)) {
        flag = false;
        break;
      }
    }
    return flag;
  },

  /**
   * Verify the date is sorted reverse
   * @param {Array} array
   * @returns {boolean}
   */
  isSortedByDateReverse(array) {
    let flag = true;
    for (let i = 0; i <= array.length - 2; i++) {
      let date1 = new Date(array[i]);
      let date2 = new Date(array[i + 1]);
      if (!(date2 <= date1)) {
        flag = false;
        break;
      }
    }
    return flag;
  },

  /**
   * return a date one month ago in 'mm/dd/yyy' format
   * @returns {string}
   */
  dateOneMonthAgo() {
    let offset = new Date().getTimezoneOffset();
    let today = new Date(new Date() - offset * 60 * 1000);
    today.setMonth(today.getMonth() - 1);

    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return mm + "/" + dd + "/" + yyyy;
  },

  /**
   * Get random date of birth by age
   * @param age
   */
  getRandomBirthdayByAge(age) {
    age = typeof age === "string" ? parseInt(age) : age;
    function getRange(age) {
      let now = new Date();
      let earliest = new Date(now.getTime());
      let latest = new Date(now.getTime());

      earliest.setFullYear(earliest.getFullYear() - (age + 1));
      earliest.setDate(earliest.getDate() + 2);

      latest.setFullYear(latest.getFullYear() - age);
      latest.setDate(latest.getDate() - 2);

      return [earliest, latest];
    }

    function dateBetween(from, to) {
      from = from.getTime();
      to = to.getTime();
      return new Date(from + Math.random() * (to - from));
    }

    function formatDate(date) {
      return moment(date).format("MM/DD/YYYY");
    }

    let range = getRange(age);
    let date = dateBetween(range[0], range[1]);

    return formatDate(date);
  },

  /**
   * Calculate full age between dates
   * @param dob
   * @param tillDate
   * @return {number}
   */
  getAge(dob, tillDate = new Date()) {
    dob = moment(new Date(dob));
    tillDate = moment(new Date(tillDate));

    return tillDate.diff(dob, "years");
  },

  /**
   * return tax id
   * @param {number} length
   * @returns {number}
   */
  generateRandomNumber(length = 9) {
    let numbers = "1235678",
      str = "";

    for (let i = 0; i < length; i++) {
      str += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return str;
  },

  /**
   * Return the sort status as True or False for provided array based on sort status provided
   * @param {string} array
   * @param {string} sortFactor Ascending or Descending
   * @returns {boolean}
   */
  async isArraySorted(array, sortFactor) {
    let nonSortedArray = [];
    for (let value of array) {
      nonSortedArray.push(value.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""));
    }
    if (sortFactor.toLowerCase().includes("asc")) {
      return this.isAlphabetSort(nonSortedArray);
    }
    if (sortFactor.toLowerCase().includes("desc")) {
      return this.isAlphabetReverseSort(nonSortedArray);
    }
  },

  /**
   * Return the sort status as True or False for provided date array based on sort status provided
   * @param {string} array
   * @param {string} sortFactor Ascending or Descending
   * @returns {boolean}
   */
  async isArraySortedByDate(array, sortFactor) {
    if (sortFactor.toLowerCase().includes("asc")) {
      return this.isSortedByDate(array);
    }
    if (sortFactor.toLowerCase().includes("desc")) {
      return this.isSortedByDateReverse(array);
    }
  },
};
