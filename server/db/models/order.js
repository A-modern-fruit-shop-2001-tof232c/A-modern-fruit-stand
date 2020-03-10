const Sequelize = require('sequelize')
const db = require('../db')
const OrderFruit = require('./orderFruit')

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

Order.beforeUpdate(async orderInstance => {
  const eagerload = await OrderFruit.findAll({
    where: {
      orderId: orderInstance.id
    }
  })
  orderInstance.orderTotal = eagerload.reduce((accumlator, el) => {
    return accumlator + el.itemTotal
  }, 0)
})
