const {expect} = require('chai')
const sinon = require('sinon')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')
const Fruit = db.model('fruit')

// describe('Cart routes', () => {
//   const userFirstName = 'Cody'
//   const userLastName = 'Pug'
//   const userEmail = 'cody@email.com'
//   const userPassword = '123'

//   const testTotal = 247
//   const orderPaid = false

//   const fruitName = 'Apple'
//   const fruitImgURL =
//     'https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/512/32349-red-apple-icon.png'
//   const fruitPrice = 0.49
//   const fruitOrigin = 'New York'
//   const fruitDescription = 'It is an apple'

//   beforeEach(async () => {
//     await db.sync({force: true})
//     const user = await User.create({
//       firstName: userFirstName,
//       lastName: userLastName,
//       email: userEmail,
//       password: userPassword
//     })
//     await Fruit.create({
//       name: fruitName,
//       imgURL: fruitImgURL,
//       price: fruitPrice
//     })
//     return Order.create({
//       orderTotal: testTotal,
//       userId: user.id
//     })
//   })

//   describe('api/cart', () => {
//     it('GET /api/cart', async () => {
//       const res = await authenticatedUser.get('api/cart').expect(200)
//       expect(res.body).to.be.an('object')
//       expect(res.body.orderTotal).to.be.equal(testTotal)
//     })
//   })
// })

describe('Cart Route', () => {
  const cart = {
    id: 1,
    orderTotal: 1000,
    paid: false,
    userId: 1,
    fruits: [
      {
        id: 2,
        name: 'Pear',
        price: 10,
        orderFruit: {orderId: 1, quantity: 1, itemPrice: 10, fruitId: 2}
      },
      {
        id: 1,
        name: 'Apple',
        price: 10,
        orderFruit: {orderId: 1, quantity: 2, itemPrice: 10, fruitId: 1}
      },
      {
        id: 1,
        name: 'Lemon',
        price: 10,
        orderFruit: {orderId: 1, quantity: 2, itemPrice: 10, fruitId: 1}
      }
    ]
  }
  // Creating the user.
  const authenticatedUserCart = request.agent(app)

  before(function(done) {
    authenticatedUserCart
      .post('/cart')
      .send(cart)
      .end(function(err, response) {
        console.log(err)
        expect(response.statusCode).to.equal(200)
        expect('Location', '/cart')
        done()
      })
  })

  it('GET /api/cart responds with loggedIn users cart', function(done) {
    authenticatedUserCart.get('/cart').expect(200, done)
  })

  it('should return a 302 response for a guest cart', function(done) {
    request(app)
      .get('/cart')
      .expect(302, done)
  })

  it('PUT /api/cart/:fruitId responds with loggedIn users cart', function(done) {
    authenticatedUserCart.put('/cart/:fruitId').expect(200, done)
  })

  it('should return a 302 response for a guest cart', function(done) {
    request(app)
      .put('/cart/:fruitId')
      .expect(302, done)
  })

  it('PUT /api/cart/:fruitId/:isIncrement responds with loggedIn users cart', function(done) {
    authenticatedUserCart.put('/cart/:fruitId/:isIncrement').expect(200, done)
  })

  it('should return a 302 response for a guest cart', function(done) {
    request(app)
      .put('/cart/:fruitId/:isIncrement')
      .expect(302, done)
  })

  it('DELETE /api/cart responds with loggedIn users cart', function(done) {
    authenticatedUserCart.get('/cart').expect(200, done)
  })

  it('should return a 302 response for a guest cart', function(done) {
    request(app)
      .get('/cart')
      .expect(302, done)
  })
})
