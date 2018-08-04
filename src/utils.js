/**
 * @param {string} num
 */
function isValidNum(num) {
  return typeof num === "string" && /^\-?(\d+|\d+\.\d+)$/.test(num);
}

/**
 * @param {string} num
 */
function isValid64Bit(num) {
  return typeof num === "string" && num.length === 64 && /^[01]+$/.test(num);
}

/**
 * @param {string[]} list
 * @param {number} len
 */
function fillWithZero(list, len) {
  for (let i = 0; i < len; i++) {
    list.push("0");
  }
}

/**
 * @param {string} str
 * @param {boolean} negative
 */
function fillSign(str, negative) {
  return negative ? "1" + str : "0" + str;
}

/**
 * 将一个数字字符串的小数部分转为二进制数组
 *
 * @param {string} num
 * @returns {string[]}
 */
function convertFractionDecimalToBinary(num) {
  const fraction = num.split(".")[1];

  const fractionNum = Number(fraction);

  let mulResult = fractionNum;
  let binaryFractionList = [];
  while (true) {
    mulResult = mulResult * 2;
    if (mulResult === 10) {
      break;
    } else if (mulResult < 10) {
      binaryFractionList.push("0");
    } else {
      binaryFractionList.push("1");
      mulResult -= 10;
    }

    if (binaryFractionList.length >= 64) {
      break;
    }
  }

  return binaryFractionList;
}

/**
 * 将十进制整数转为二进制
 *
 * @param {string} num
 * @returns {string[]}
 */
function convertIntegerDecimalToBinary(num) {
  const list = [];

  while (num) {
    const remainder = num % 2;
    list.unshift("" + remainder);
    num = (num - remainder) / 2;
  }

  return list;
}

/**
 * 将十进制转为二进制
 *
 * @param {string} num
 */
exports.convertDecimalToBinary = function convertDecimalToBinary(num) {
  const [integerDecimal, fractionDecimal] = num.split(".");
  let integerList = [],
    fractionList = [];

  if (integerDecimal !== "0") {
    integerList = convertIntegerDecimalToBinary(Number(integerDecimal));
  }

  if (fractionDecimal !== "0") {
    fractionList = convertFractionDecimalToBinary("0." + fractionDecimal);
  }

  return {
    integerList,
    fractionList
  };
};

/**
 * @param {string} num
 * @returns {number}
 */
function convertBinaryToIntegerDecimal(num) {
  const len = num.length;

  const list = num.split("").reverse();
  let total = 0;
  for (let i = 0; i < len; i++) {
    if (list[i] === "1") {
      total += Math.pow(2, i);
    }
  }

  return total;
}

/**
 * @param {string} num
 * @returns {number}
 */
function convertBinaryToFractionDecimal(num) {
  const len = num.length;
  const list = num.split("");

  let total = 0;
  for (let i = 0; i < len; i++) {
    if (list[i] === "1") {
      total += Math.pow(2, (i + 1) * -1);
    }
  }

  return total;
}

exports.convertFractionDecimalToBinary = convertFractionDecimalToBinary;
exports.convertIntegerDecimalToBinary = convertIntegerDecimalToBinary;
exports.fillSign = fillSign;
exports.fillWithZero = fillWithZero;
exports.isValidNum = isValidNum;
exports.isValid64Bit = isValid64Bit;
exports.convertBinaryToIntegerDecimal = convertBinaryToIntegerDecimal;
exports.convertBinaryToFractionDecimal = convertBinaryToFractionDecimal;
