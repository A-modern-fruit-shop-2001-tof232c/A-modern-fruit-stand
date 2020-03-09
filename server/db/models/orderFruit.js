const Sequelize = require('sequelize')
const db = require('../db')

const OrderFruit = db.define('orderFruit', {
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

// OrderFruit.prototype.calculateItemsTotal = function() {
//   this.itemTotal = this.itemPrice * this.quantity
//   return this.itemTotal
// }

// OrderFruit.beforeUpdate(function(orderFruit) {
//   console.log('before updatehook !!!!!!')
//   orderFruit.itemTotal = orderFruit.itemPrice * orderFruit.quantity
//   console.log('new ? itemTotal', orderFruit.itemTotal)
// })

// User.beforeCreate((userInstance, optionsObject) => {
//   userInstance.password = hash(userInstance.password)
// })

// OrderFruit.beforeUpdate((instance, optionsObject) => {
//   console.log('before updatehook !!!!!!')
//   instance.itemTotal = instance.quantity * instance.itemPrice
//   console.log('new ? itemTotal', instance.itemTotal)
// })

OrderFruit.addHook('afterUpdate', (instance, options) => {
  console.log('before updatehook !!!!!!')
  instance.itemTotal = instance.quantity * instance.itemPrice
  console.log('new ? itemTotal', instance.itemTotal)
})
