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
const gotSingleFruit = info => {
  return {
    type: GET_ONE,
    info
  }
}
// Thunk Creator
export const singleFruitThunk = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/fruit/' + id)
      dispatch(gotSingleFruit(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// Fruit Reducer
const fruitReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return ///////:3
    case GET_ONE:
      return {...state, selectedFruit: action.info}
    default:
      return state
  }
}

export default fruitReducer
