import axios from 'axios'

// ACTION TYPES
const GET_CART = 'GET_CART'
const GET_GUEST_CART = 'GET_GUEST_CART'
const UPDATE_CART = 'UPDATE_CART'
const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART '

// ACTION CREATORS
export const gotCart = cart => ({
  type: GET_CART,
  cart
})

// create an object to include subtotal and fruits to
// be consistant with cart object in getCart.
// export const gotGuestCart = (orderTotal, fruits) => ({
//   type: GET_GUEST_CART,
//   orderTotal,
//   fruits
// })

export const updatedCart = fruit => ({
  type: UPDATE_CART,
  fruit
})

// export const updatedGuestCart = (fruitId, quantity) => ({
//   type: UPDATE_GUEST_CART,
//   fruitId,
//   quantity
// })

// THUNK CREATORS

// For logged in users. AJAX request to api get route.
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart/')
    dispatch(gotCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const getGuestCart = () => async dispatch => {
  try {
    // get localStorage object.
    // const guestCart = JSON.parse(localStorage.getItem('cart'))
    let orderTotal = 0
    let fruits = []
    // reassign state fields base on key/value properities placed in the localstorage.
    // Depends on the eventhandlers in the singleFruit component.
    dispatch(gotGuestCart(orderTotal, fruits))
  } catch (err) {
    console.log(err)
  }
}

// export const updateGuestCart = () => async dispatch => {
//   try {
//   } catch (err) {
//     console.log(err)
//   }
// }

export const getUpdateCart = fruit => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${fruit.fruitId}`, {
      id: fruit.fruitId,
      quantity: fruit.quantity
    })
    dispatch(updatedCart(data))
  } catch (err) {
    console.log(err)
  }
}

// CART REDUCER
const initialState = {
  // id: 'guest',
  // orderTotal: 0,
  // paid: false,
  // userId: null,
  // fruits: []
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      return action.cart
    }
    case GET_GUEST_CART: {
      return {...state, orderTotal: action.orderTotal, fruits: action.fruits}
    }
    case UPDATE_CART: {
      // might need to change to action.cart
      return {...state, fruits: [...state.fruits, action.fruit]}
    }
    default: {
      return state
    }
  }
}

export default cartReducer
