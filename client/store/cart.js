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
  return {
    type: GET_CART,
    cart
  }
}

//---------------------------UPDATE GUEST CART------------------------------
//this receives a fruit in the format: {fruitId, quantity}
export const updateGuestCart = fruitToAdd => {
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
  const oldCart = JSON.parse(window.localStorage.getItem('guestCart')).fruits
  let newCart = []
  //if item is new to cart
  if (!oldCart.map(el => el.id).includes(fruitToAdd.fruitId)) {
    console.log('new to cart')
    let newFruit = {
      price: 99,
      id: fruitToAdd.fruitId,
      name: 'lala',
      imgUrl: 'tbd',
      orderFruit: {
        quantity: fruitToAdd.quantity,
        itemPrice: 99,
        itemTotal: 99,
        fruitId: 'xxx'
      }
    }
    newCart = [...oldCart, newFruit]
  } else {
    //if cart already has a qty of fruit to add
    console.log('not new to cart')
    newCart = oldCart.map(el => {
      if (el.id === fruitToAdd.fruitId) {
        el.orderFruit.quantity += fruitToAdd.quantity
        el.itemTotal += fruitToAdd.quantity * el.orderFruit.itemPrice
      }
      return el
    })
  }
  //create object to send back to reducer and reset local storage
  const fruit = {orderTotal: 0, fruits: newCart}
  window.localStorage.setItem('guestCart', JSON.stringify(fruit))
  console.log(JSON.parse(window.localStorage.guestCart))
  return {
    type: UPDATE_CART,
    fruit
  }
}
//------------------------END OF UPDATE GUEST CART------------------------------

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
