const Sequelize = require('sequelize')
const db = require('../db')

const OrderFruit = db.define('orderFruit', {
  // TODO: Look into keeping orderId and fruitId
  orderId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  itemPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0.0
    }
  },
  itemTotal: {
    type: Sequelize.INTEGER
  },
  fruitId: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderFruit
