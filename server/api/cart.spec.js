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
  const userEmail = 'cody@email.com'
  const userPassword = '123'

  const testTotal = 247
  const orderPaid = false

  const fruitName = 'Apple'
  const fruitImgURL =
    'https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/512/32349-red-apple-icon.png'
  const fruitPrice = 0.49
  const fruitOrigin = 'New York'
  const fruitDescription = 'It is an apple'

  beforeEach(async () => {
    await db.sync({force: true})
    const user = await User.create({
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword
    })
    await Fruit.create({
      name: fruitName,
      imgURL: fruitImgURL,
      price: fruitPrice
    })
    return Order.create({
      orderTotal: testTotal,
      userId: user.id
    })
  })

  describe('api/cart', () => {
    it('GET /api/cart', async () => {
      const authenticatedUser = request.agent(app)
      await authenticatedUser
        .post('/auth/login')
        .send({email: userEmail, password: userPassword})
        .expect(200)
      const res = await authenticatedUser.get('api/cart').expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.orderTotal).to.be.equal(testTotal)
    })
  })
})
