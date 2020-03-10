// Test for cart store.
import {expect} from 'chai'
import {getCart} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getCart', () => {
    it('eventually dispatches the GET CART action', async () => {
      const fakeUser = {
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
      mockAxios.onGet('/api/cart').replyOnce(200, fakeUser)
      await store.dispatch(getCart())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeUser)
    })
  })
})
