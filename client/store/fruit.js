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

export const addFruitThunk = () => {
  return async dispatch => {
    try {
      await axios.post('/api/fruit')
      const {data} = await axios.get('/api/fruit')
      dispatch(gotAllFruit(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteFruitThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/fruit/${id}`)
      const {data} = await axios.get('/api/fruit')
      dispatch(gotAllFruit(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateFruitThunk = id => {
  return async dispatch => {
    try {
      await axios.put(`/api/fruit/${id}`)
      const {data} = await axios.get(`/api/fruit/${id}`)
      dispatch(gotSingleFruit(data))
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
    case GET_ONE:
      return {...state, selectedFruit: action.info}
    default:
      return state
  }
}

export default fruitReducer
