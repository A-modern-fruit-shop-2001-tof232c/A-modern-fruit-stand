import axios from 'axios'

// Initial State
const initialState = {
  allFruit: [],
  selectedFruit: {}
}

// Action Types
const GET_ALL = 'GET_ALL'
const GET_ONE = 'GET_ONE'
// Action Creator
const getAllFruit = info => {
  return {
    type: GET_ALL,
    info
  }
}
// Thunk Creator

// Fruit Reducer
const fruitReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return ///////:3

    default:
      return state
  }
}

export default fruitReducer
