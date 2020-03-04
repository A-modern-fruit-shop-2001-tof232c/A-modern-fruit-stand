const Sequelize = require('sequelize')
const db = require('../db')

const OrderFruit = db.define('orderFruit', {
  orderId: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0.0
    }
  },
  fruitId: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderFruit
