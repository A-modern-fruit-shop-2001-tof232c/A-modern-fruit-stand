const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')
const Fruit = db.model('fruit')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/:userId', () => {
    const total = 10.0
    const paid = false
    // TODO: Continue with additional fields.
    beforeEach(() => {
      return Order.create({
        total: total,
        paid: paid
      })
    })
  })
})
