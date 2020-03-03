const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: new Date()
  },
  total: {
    type: Sequelize.FLOAT,
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

Order.prototype.calculateTotal = function() {}
