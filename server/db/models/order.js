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
  console.log('in the afterupdate line 23')
  const eagerload = await OrderFruit.findAll({
    where: {
      orderId: orderInstance.id
    }
  })
  console.log('inafterupdate hook ----', eagerload)
  orderInstance.orderTotal = eagerload.reduce((accumlator, el) => {
    return accumlator + el.itemTotal
  }, 0)
  console.log('after .reduce()', orderInstance.orderTotal)
})
