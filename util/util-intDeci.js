// convert decimal to integer(price in pennies)

const deciToInt = function(decimalString) {
  return Number(decimalString) * 100
}

module.exports = deciToInt
