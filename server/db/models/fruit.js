const Sequelize = require('sequelize')
const db = require('../db')

const Fruit = db.define('fruit', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  blurb: {
    type: Sequelize.TEXT
  },
  imgURL: {
    type: Sequelize.STRING,
    defaultValue: 'www.findImageOfRottenPear'
  },
  origin: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Fruit
