// convert decimal to integer(price in pennies)

const deciToInt = function(decimalString) {
  return Number(decimalString) * 100
}

function convertPrice(priceInCents) {
  let dollars = Math.floor(priceInCents / 100)
  let cents = priceInCents % 100
  if (cents < 10) {
    cents = '0' + String(cents)
  }
  return `$ ${dollars}.${cents}`
}

module.exports = {deciToInt, convertPrice}
