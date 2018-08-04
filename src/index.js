const {
  convertDecimalToBinary,
  convertIntegerDecimalToBinary,
  fillSign,
  fillWithZero,
  isValidNum
} = require("./utils");

/**
 * convert a decimal to IEEE 754
 *
 * @param {string} num
 */
function decimalToIEEE754(num) {
  if (!isValidNum(num)) {
    throw new TypeError("Invalid input");
  }

  const negative = num[0] === "-";
  if (negative) {
    num = num.slice(1);
  }

  if (!num.includes(".")) {
    num = num + ".0";
  }

  const { integerList, fractionList } = convertDecimalToBinary(num);
  if (integerList.length === 0 && fractionList.length === 0) {
    const list = [];
    fillWithZero(list, 63);
    return fillSign(list.join(""), negative);
  }

  if (fractionList.length === 0) {
    fillWithZero(fractionList, 52);
  }

  let oneStartIndex;
  if (integerList.length > 0) {
    oneStartIndex = integerList.length - 1;
  } else {
    oneStartIndex = -1 * (fractionList.findIndex(item => item === "1") + 1);
  }

  let fraction;
  if (oneStartIndex > 0) {
    fraction = integerList.slice(1).concat(fractionList);
  } else {
    fraction = fractionList.slice(-1 * oneStartIndex);
  }

  let e = convertIntegerDecimalToBinary(1023 + oneStartIndex);
  const ePaddingLen = 11 - e.length;
  if (ePaddingLen < 0) {
    e = e.slice(-ePaddingLen);
  }

  for (let i = 0; i < ePaddingLen; i++) {
    e.unshift("0");
  }

  const seq = e.concat(fraction.slice(0, 52)).join("");

  return fillSign(seq, negative);
}

exports.decimalToIEEE754 = decimalToIEEE754;
