const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')
const Fruit = db.model('fruit')

describe('Cart routes', () => {
  const userFirstName = 'Cody'
  const userLastName = 'Pug'
  const userEmail = 'cody@emai.com'
  const userPassword = '123'

  const orderTotal = 2.47
  const orderPaid = false

  const fruitName = 'Apple'
  const fruitImgURL =
    'https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/512/32349-red-apple-icon.png'
  const fruitPrice = 0.49
  const fruitOrigin = 'New York'
  const fruitDescription = 'It is an apple'

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/:userId', () => {
    // TODO: Continue with additional fields.
    beforeEach(() => {
      return Order.create({})
    })
  })
})
