import axios from 'axios'

//Initial State
const initialState = {
  orderTotal: 0,
  fruits: []
}

// ACTION TYPES
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const ADD_ITEM = 'ADD_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CHECKOUT_CART = 'CHECKOUT_CART'

//The rest of the action types are specific to guest vs. logged in user
// const GET_GUEST_CART = 'GET_GUEST_CART'
// const GET_GUEST_CART = 'GET_GUEST_CART'
const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART ' // adding an item to cart from all fruits
const ADJUST_GUEST_CART = 'ADJUST_GUEST_CART' //increment or decrement on cart page

// ACTION CREATORS
const gotCart = cart => ({
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

//--------------------- UPDATE / ADD TO GUEST CART------------------------------
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
      imgURL: fruitToAdd.selectedFruit.imgURL,
      orderFruit: {
        itemPrice: fruitToAdd.selectedFruit.price,
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
        el.orderFruit.quantity =
          Number(el.orderFruit.quantity) + Number(fruitToAdd.quantity)
        el.orderFruit.itemTotal += fruitToAdd.quantity * el.orderFruit.itemPrice
      }
      return el
    })
  }
  //create a new cart total
  const newTotal = (oldStorage.orderTotal +=
    fruitToAdd.quantity * fruitToAdd.selectedFruit.price)
  //create object to send back to reducer and reset local storage
  const fruit = {orderTotal: newTotal, fruits: newCart}
  window.localStorage.setItem('guestCart', JSON.stringify(fruit))
  return {
    type: UPDATE_GUEST_CART,
    fruit
  }
}

//------------------------REMOVE GUEST ITEM------------------------------
export const removeGuestItem = fruitId => {
  fruitId = Number(fruitId)
  const oldStorage = JSON.parse(window.localStorage.getItem('guestCart'))
  let priceReduction = 0
  const editedCart = oldStorage.fruits.filter(el => {
    if (el.id === fruitId) {
      priceReduction = el.orderFruit.itemTotal
      return false
    }
    return true
  })
  const cart = {
    orderTotal: oldStorage.orderTotal - priceReduction,
    fruits: editedCart
  }
  window.localStorage.setItem('guestCart', JSON.stringify(cart))
  return {
    type: REMOVE_ITEM,
    cart
  }
}

//------------------------INCREMENT OR DECREMENT GUEST ITEM---------------------------
export const incrOrDecrGuestCart = (incrOrDecr, fruitId) => {
  fruitId = Number(fruitId)
  let changeQty = 1
  if (incrOrDecr === '-') {
    changeQty = -1
  }
  const oldStorage = JSON.parse(window.localStorage.getItem('guestCart'))

  let priceChange = 0
  // console.log(oldStorage.fruits)
  const editedCart = oldStorage.fruits.map(el => {
    if (el.id === fruitId) {
      //if user decrements and item qty is 1, remove item completely
      if (el.orderFruit.quantity === '1' && changeQty === -1) {
        console.log('removing last item')
        return removeGuestItem(fruitId)
      } else {
        //update the fruit total price and the qty
        priceChange = changeQty * el.price
        el.orderFruit.itemTotal += priceChange
        el.orderFruit.quantity =
          Number(el.orderFruit.quantity) + Number(changeQty) //CHECK HERE!!!!!!!!:)
      }
    }
    return el
  })
  const newTotal = oldStorage.orderTotal + priceChange
  console.log('newTotal: ', newTotal)
  const newStorage = {orderTotal: newTotal, fruits: editedCart}
  //now filter thru cart to reduce/increase fruit, line total, and order total
  //return new storage item
  //place on local storage and update redux store
  window.localStorage.setItem('guestCart', JSON.stringify(newStorage))
  return {
    type: ADJUST_GUEST_CART,
    newStorage
  }
}

const gotCheckoutCart = cartid => ({
  type: CHECKOUT_CART,
  cartid
})

export const updatedQuantity = cart => ({
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

export const getUpdateCart = fruit => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${fruit.fruitId}`, {
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

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      return action.cart
    }
    case UPDATE_GUEST_CART: {
      return {orderTotal: action.fruit.orderTotal, fruits: action.fruit.fruits}
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
    case ADJUST_GUEST_CART: {
      return action.newStorage
    }
    default: {
      return state
    }
  }
}

export default cartReducer
