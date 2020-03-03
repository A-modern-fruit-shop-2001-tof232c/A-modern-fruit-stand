import axios from 'axios'

// Initial State
const initialState = {
  allFruit: [],
  selectedFruit: {}
}

// Action Types
const GOT_ALL = 'GOT_ALL'
const GET_ONE = 'GET_ONE'

// Action Creator
const gotAllFruit = info => {
  return {
    type: GOT_ALL,
    info
  }
}

// Thunk Creator

export const getAllFruit = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/fruit')
      dispatch(gotAllFruit(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// Fruit Reducer
const fruitReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL:
      return {...state, allFruit: action.info}

    default:
      return state
  }
}

export default fruitReducer
