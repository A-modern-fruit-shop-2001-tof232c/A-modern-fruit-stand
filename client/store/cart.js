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
const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART '
const REMOVE_ITEM = 'REMOVE_ITEM'

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
//this receives a fruit in the format: {quantity, selectedFruit}
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
  const oldStorage = JSON.parse(window.localStorage.getItem('guestCart'))
  const oldCart = oldStorage.fruits
  let newCart = []
  //if item is new to cart
  if (!oldCart.map(el => el.id).includes(fruitToAdd.selectedFruit.id)) {
    let newFruit = {
      price: fruitToAdd.selectedFruit.price,
      id: fruitToAdd.selectedFruit.id,
      name: fruitToAdd.selectedFruit.name,
      imgUrl: fruitToAdd.selectedFruit.imgURL,
      orderFruit: {
        itemPrice: fruitToAdd.selectedFruit.price, //localStorage stores in DOLLARS
        quantity: fruitToAdd.quantity,
        itemTotal: fruitToAdd.selectedFruit.price * fruitToAdd.quantity,
        fruitId: fruitToAdd.selectedFruit.id
      }
    }
    newCart = [...oldCart, newFruit]
  } else {
    //if cart already has a qty of fruit to add
    newCart = oldCart.map(el => {
      if (el.id === fruitToAdd.selectedFruit.id) {
        el.orderFruit.quantity += fruitToAdd.quantity
        el.orderFruit.itemTotal =
          (el.orderFruit.itemTotal * 100 +
            fruitToAdd.quantity * el.orderFruit.itemPrice * 100) /
          100
      }
      return el
    })
  }
  //create a new cart total
  const newTotal =
    (oldStorage.orderTotal * 100 +
      fruitToAdd.quantity * fruitToAdd.selectedFruit.price * 100) /
    100
  //create object to send back to reducer and reset local storage
  const fruit = {orderTotal: newTotal, fruits: newCart}
  window.localStorage.setItem('guestCart', JSON.stringify(fruit))
  return {
    type: UPDATE_GUEST_CART,
    fruit
  }
}
//------------------------END OF UPDATE GUEST CART------------------------------

export const removedItem = cart => ({
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

export const removeItem = fruitId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/${fruitId}`)
    dispatch(removedItem(data))
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
    case UPDATE_GUEST_CART: {
      return {orderTotal: action.fruit.orderTotal, fruits: action.fruit.fruits}
    }
    case UPDATE_CART: {
      // might need to change to action.cart
      return {...state, fruits: [...state.fruits, action.fruit]}
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
