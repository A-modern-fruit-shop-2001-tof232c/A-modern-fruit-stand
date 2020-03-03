const {expect} = require('chai')
const db = require('../index')
const Fruit = db.model('fruit')

//Fruit should NOT be able to add a fruit w/o a name and price
//Fruit model should be able to add a fruit without an origin
describe('Fruit model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

})
