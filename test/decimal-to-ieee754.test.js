import { test } from "ava";
import { decimalToIEEE754 } from "../src";

test("only fraction", t => {
  t.is(
    decimalToIEEE754("0.1"),
    "0011111110111001100110011001100110011001100110011001100110011010"
  );
});

test("only integer", t => {
  t.is(
    decimalToIEEE754("1"),
    "0011111111110000000000000000000000000000000000000000000000000000"
  );
});

test("integer with fraction", t => {
  t.is(
    decimalToIEEE754("1.1"),
    "0011111111110001100110011001100110011001100110011001100110011010"
  );
});

test("zero", t => {
  t.is(
    decimalToIEEE754("0"),
    "0000000000000000000000000000000000000000000000000000000000000000"
  );

  t.is(
    decimalToIEEE754("-0"),
    "1000000000000000000000000000000000000000000000000000000000000000"
  );
});

test("invalid input", t => {
  const invalidList = ["1.", ".0", "a", "", 1, 0, null];

  invalidList.forEach(item => {
    t.throws(() => {
      decimalToIEEE754(item);
    });
  });
});
