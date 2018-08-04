import { test } from "ava";
import { ieee754ToDecimal } from "../src";

function equal(num1, num2) {
  return Math.abs(num1 - num2) < 0.00001;
}

test("zero", t => {
  t.is(
    ieee754ToDecimal(
      "0000000000000000000000000000000000000000000000000000000000000000"
    ),
    0
  );

  t.is(
    ieee754ToDecimal(
      "1000000000000000000000000000000000000000000000000000000000000000"
    ),
    0
  );
});

test("invalid input", t => {
  const invalidList = ["1.", ".0", "a", "", 1, 0, null];

  invalidList.forEach(item => {
    t.throws(() => {
      ieee754ToDecimal(item);
    });
  });
});

test("only fraction", t => {
  t.is(
    equal(
      ieee754ToDecimal(
        "0011111110111001100110011001100110011001100110011001100110011001"
      ),
      0.1
    ),
    true
  );
});

test("only integer", t => {
  t.is(
    ieee754ToDecimal(
      "0011111111110000000000000000000000000000000000000000000000000000"
    ),
    1
  );
});

test("integer with fraction", t => {
  t.is(
    equal(
      ieee754ToDecimal(
        "0011111111110001100110011001100110011001100110011001100110011001"
      ),
      1.1
    ),
    true
  );
});
