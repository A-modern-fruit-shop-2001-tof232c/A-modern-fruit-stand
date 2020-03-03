const db = require('../db')
const User = require('./user')
const Fruit = require('./fruit')
const Order = require('./order')
const Sequelize = require('sequelize')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
const OrderFruit = db.define('orderFruit', {
  orderId: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  }
})
// Users can have multiple orders
// Orders can only belong to one user
User.hasMany(Order)
Order.belongsTo(User)
// one order has many fruit items
// one fruit can associate with many order#s
Order.belongsToMany(Fruit, {through: 'orderFruit'})
Fruit.belongsToMany(Order, {through: 'orderFruit'})
// -------- original idea for cart ----------
//
// (not using this, keeping for notes)
// one user associates with many fruits through cart
// one fruit associates with many users through cart
// User.belongsToMany(Fruit, {through: 'cart'})
// Fruit.belongsToMany(User, {through: 'cart'})
// -------------------------------------------

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Fruit,
  Order,
  OrderFruit
}
