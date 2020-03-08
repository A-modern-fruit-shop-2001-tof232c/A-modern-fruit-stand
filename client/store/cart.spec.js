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

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  // describe('getCart', () => {
  //   it('eventually dispatches the GET CART action', async () => {
  //     const fakeCart = {
  //       id: 1,
  //       date: '2020-03-05',
  //       orderTotal: 0,
  //       paid: false,
  //       createdAt: '2020-03-06T04:13:25.169Z',
  //       updatedAt: '2020-03-06T04:13:25.169Z',
  //       userId: 1,
  //       fruits: [
  //         {
  //           price: 1.49,
  //           id: 1,
  //           name: 'Pear',
  //           imgURL:
  //             'http://t0.gstatic.com/images?q=tbn%3AANd9GcT8AyNUZwWTLisWeZDQVdRgX65uAgsxtYdLrvTgiecg0tfMR9kXOPS_CL2uzC6eWMFHtiQO0ZNR&usqp=CAc',
  //           orderFruit: {
  //             orderId: 1,
  //             quantity: 1,
  //             itemPrice: 49,
  //             itemTotal: 0,
  //             fruitId: 1,
  //             createdAt: '2020-03-06T04:13:25.185Z',
  //             updatedAt: '2020-03-06T04:13:25.185Z'
  //           }
  //         }
  //       ]
  //     }
  //     mockAxios.onGet('/cart').replyOnce(200, fakeCart)
  //     await store.dispatch(getCart())
  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('GET_USER')
  //     expect(actions.cart).to.be.deep.equal(fakeCart)
  //   })
  // })
})
