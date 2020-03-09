const Sequelize = require('sequelize')
const db = require('../db')

const Fruit = db.define('fruit', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imgURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://previews.123rf.com/images/olegdudko/olegdudko1809/olegdudko180907912/108668968-bitten-pear.jpg'
  },
  origin: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Fruit
