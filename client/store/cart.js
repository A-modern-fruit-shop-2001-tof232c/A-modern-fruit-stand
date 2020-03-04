import axios from 'axios'

// ACTION TYPES
const GET_CART = 'GET_CART'
const GET_GUEST_CART = 'GET_GUEST_CART'

// ACTION CREATORS
export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const getGuestCart = (subtotal, fruits) => ({
  type: GET_GUEST_CART,
  subtotal,
  fruits
})

// THUNK CREATORS

// For logged in users. AJAX request to api get route.
export const gotCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart/:usderId')
    dispatch(getCart(data))
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
