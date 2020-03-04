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
    allowNull: false,
    get() {
      let price = this.getDataValue('price') / 100
      //IF PRICE IS .90 display # is .9...How can we append a zero?
      //I BELIEVE WE NEED TO DO THIS IN DISPLAY SETTINGS, SINCE THIS IS TYPE INTEGER
    }
  }
})

module.exports = Fruit
