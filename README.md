Converter between decimal and IEEE754(64-bit).

## Usage

```js
const { decimalToIEEE754, ieee754ToDecimal } = require("ieee754");

console.log(decimalToIEEE754("263.3"));
// 0100000001110000011101001100110011001100110011001100110011001100

console.log(
  ieee754ToDecimal(
    "0011111111110000000000000000000000000000000000000000000000000000"
  )
);
// 1
```

## TODO

- Check rounding rules
