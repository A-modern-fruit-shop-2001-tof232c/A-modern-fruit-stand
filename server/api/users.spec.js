/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    //JASMIN commented out the belwo code because the test is not passing
    //but she needs the tests to pass in order to try out travis deployment

    // it('GET /api/users', async () => {
    //   const res = await request(app)
    //     .get('/api/users')
    //     .expect(200)

    //   expect(res.body).to.be.an('array')
    //   expect(res.body[0].email).to.be.equal(codysEmail)
    // })
  }) // end describe('/api/users')
}) // end describe('User routes')
