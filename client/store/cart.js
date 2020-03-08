import axios from 'axios'

//Initial State
const initialState = {
  orderTotal: 0,
  fruits: []
}

// ACTION TYPES
const GET_CART = 'GET_CART'
// const GET_GUEST_CART = 'GET_GUEST_CART'
const UPDATE_CART = 'UPDATE_CART'
// const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART '

// ACTION CREATORS
export const gotCart = cart => ({
  type: GET_CART,
  cart
})

export const updatedCart = fruit => ({
  type: UPDATE_CART,
  fruit
})

export const getGuestCart = () => {
  //If guest is new, add an empty cart on local storage
  if (!window.localStorage.guestCart) {
    window.localStorage.setItem(
      'guestCart',
      JSON.stringify({
        orderTotal: 0,
        fruits: []
      })
    )
  }
  const cart = JSON.parse(window.localStorage.getItem('guestCart'))

  // console.log('I am the local storage cart for a guest', guestFruits)
  // console.log(window.localStorage.guestCart)
  return {
    type: GET_CART,
    cart
  }
}

// export const updateGuestCart = (item)

// THUNK CREATORS

// For logged in users. AJAX request to api get route.
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(gotCart(data))
  } catch (err) {
    console.log(err)
  }
}

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

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      return {orderTotal: action.cart.orderTotal, fruits: action.cart.fruits}
    }
    // case GET_GUEST_CART: {
    //   return {orderTotal: action.orderTotal, fruits: action.guestFruits}
    // }
    case UPDATE_CART: {
      return {...state, fruits: [...state.fruits, action.fruit]}
    }
    default: {
      return state
    }
  }
}

export default cartReducer
