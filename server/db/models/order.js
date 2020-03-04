const Sequelize = require('sequelize')
const db = require('../db')
const orderFruit = require('./orderFruit')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: new Date()
  },
  orderTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  paid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order

/*
In the amount of time I wasn't sure the best way to handle the total. Whether it's through class/prototype method or a utility function. But left this prototype func here.
*/

// Order.prototype.calculateOrderTotal = function() {
//   // console.log('this', this.fruits)
//   const fruitTotals= this.fruits.map(fruit => {
//     return fruit.orderFruit

//   })
//   console.log('orderFruit', orderFruit, typeof orderFruit)
//   return fruitTotals;
// }
