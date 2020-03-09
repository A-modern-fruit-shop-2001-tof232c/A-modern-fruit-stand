const Sequelize = require('sequelize')
const db = require('../db')

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
