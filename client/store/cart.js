import axios from 'axios'

// ACTION TYPES
const GET_CART = 'GET_CART'
const GET_GUEST_CART = 'GET_GUEST_CART'

// ACTION CREATORS
export const gotCart = cart => ({
  type: GET_CART,
  cart
})

// create an object to include subtotal and fruits to
// be consistant with cart object in getCart.
export const getGuestCart = (subtotal, fruits) => ({
  type: GET_GUEST_CART,
  subtotal,
  fruits
})

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

// export const gotGuestCart = () => async dispatch => {
//     try{
//         const gusetCart = ...
//     }
// }

// CART REDUCER
const initialState = {}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      return action.cart
    }
    default: {
      return state
    }
  }
}
