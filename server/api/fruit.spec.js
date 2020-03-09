const supertest = require('supertest-as-promised')(require('../index'))
const expect = require('chai').expect
const fruits = require('../db/models/fruit')
const db = require('../db')

describe('fruit routes', function() {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

// describe('/api/fruit URI', function() {
//   it('GET responds with all fruits', function() {
//     // when we make a request to /api/fruit, it returns an object with all fruits
//     return supertest
//       .get('/api/fruit')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .expect(res => {
//         expect(res.body).to.eql([])
//       })
//   })
// })
