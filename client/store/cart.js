import axios from 'axios'

// ACTION TYPES
const GET_CART = 'GET_CART'
const GET_GUEST_CART = 'GET_GUEST_CART'
const ADD_ITEM = 'ADD_ITEM'
// const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART '
const CHECKOUT_CART = 'CHECKOUT_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'

// ACTION CREATORS
const gotCart = cart => ({
  type: GET_CART,
  cart
})

// create an object to include subtotal and fruits to
// be consistant with cart object in getCart.
// const gotGuestCart = (orderTotal, fruits) => ({
//   type: GET_GUEST_CART,
//   orderTotal,
//   fruits
// })

const updatedCart = fruit => ({
  type: ADD_ITEM,
  fruit
})

const gotCheckoutCart = cartid => ({
  type: CHECKOUT_CART,
  cartid
})

const updatedQuantity = cart => ({
  type: UPDATE_QUANTITY,
  cart
})

// export const updatedGuestCart = (fruitId, quantity) => ({
//   type: UPDATE_GUEST_CART,
//   fruitId,
//   quantity
// })

const removedItem = cart => ({
  type: REMOVE_ITEM,
  cart
})

// THUNK CREATORS

// For logged in users. AJAX request to api get route.
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(gotCart(data))
  } catch (err) {
    console.error(err)
  }
}

// export const getGuestCart = () => async dispatch => {
//   try {
//     // get localStorage object.
//     // const guestCart = JSON.parse(localStorage.getItem('cart'))
//     let orderTotal = 0
//     let fruits = []
//     // reassign state fields base on key/value properities placed in the localstorage.
//     // Depends on the eventhandlers in the singleFruit component.
//     dispatch(gotGuestCart(orderTotal, fruits))
//   } catch (err) {
//     console.log(err)
//   }
// }

// export const updateGuestCart = () => async dispatch => {
//   try {
//   } catch (err) {
//     console.log(err)
//   }
// }

export const getUpdateCart = fruit => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart/${fruit.fruitId}`, {
      id: fruit.fruitId,
      quantity: fruit.quantity
    })
    dispatch(updatedCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const checkoutCart = id => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/checkout/' + id)
    dispatch(gotCheckoutCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateQuantity = (fruitId, isIncrement) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${fruitId}/${isIncrement}`)
    dispatch(updatedQuantity(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeItem = fruitId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/${fruitId}`)
    dispatch(removedItem(data))
  } catch (err) {
    console.log(err)
  }
}

// CART REDUCER
const initialState = {
  id: 'guest',
  orderTotal: 0,
  paid: false,
  userId: null,
  fruits: []
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      return action.cart
    }
    case GET_GUEST_CART: {
      return {...state, orderTotal: action.orderTotal, fruits: action.fruits}
    }
    case ADD_ITEM: {
      return {...state, fruits: [...state.fruits, action.fruit]}
    }
    case CHECKOUT_CART: {
      return initialState
    }
    case UPDATE_QUANTITY: {
      return action.cart
    }
    case REMOVE_ITEM: {
      return action.cart
    }
    default: {
      return state
    }
  }
}

export default cartReducer
