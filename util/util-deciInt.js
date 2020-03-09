// convert price in pennies to decimal number like: 1.00

const intToDecimal = function(penniesNumber) {
  return (penniesNumber / 100).toFix(2)
}

module.exports = intToDecimal
