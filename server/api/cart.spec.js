const {expect} = require('chai')
const sinon = require('sinon')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')
const Fruit = db.model('fruit')

describe('Can view logged in user cart', function(done) {
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

  describe('Loggedin user can view cart', function(done) {
    it('should return a 200 response if the user is logged in', function() {
      authenticatedUserCart.get('/cart').expect(200, done)
    })

    it('should return a 302 response for a guest cart', function() {
      request(app)
        .get('/cart')
        .expect(302, done)
    })
  })

  describe('LoggedIn user can add item to cart', function(done) {
    it('PUT /api/cart/:fruitId responds with loggedIn users cart', function(done) {
      authenticatedUserCart.put('/cart/1').expect(200, done)
    })

    it('should return a 302 response for a guest cart', function(done) {
      request(app)
        .put('/cart')
        .expect(302, done)
    })
  })

  describe('LoggedIn user can update quantity in cart', function(done) {
    it('PUT /api/cart/:fruitId/:isIncrement responds with loggedIn users cart', function(done) {
      authenticatedUserCart.put('/cart/:fruitId/:isIncrement').expect(200, done)
    })

    xit('should return a 302 response for a guest cart', function(done) {
      request(app)
        .put('/cart/:fruitId/:isIncrement')
        .expect(302, done)
    })
  })

  describe('LoggedIn user can remove item in cart', function(done) {
    it('DELETE /api/cart/:fruitId responds with loggedIn users cart', function(done) {
      authenticatedUserCart.delete('/cart/:fruitId').expect(200, done)
    })

    xit('should return a 302 response for a guest cart', function(done) {
      request(app)
        .delete('/cart/:fruitId')
        .expect(302, done)
    })
  })
})
