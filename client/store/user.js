import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const DELETE_USER = 'DELETE_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const UPDATE_SINGLE_USER = 'UPDATE_SINGLE_USER'

/**
 * INITIAL STATE
 */
// const defaultUser = {}
const initialState = {
  defaultUser: {},
  allUsers: [],
  selectedUser: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const fetchAllUsers = info => ({type: GET_ALL_USERS, info})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const gotAllUsersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(fetchAllUsers(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteUserForeverThunk = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    const {data} = await axios.get('/api/users')
    dispatch(fetchAllUsers(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, selectedUser: action.user}
    case REMOVE_USER: //this is for logging out
      return initialState
    case GET_ALL_USERS:
      return {...state, allUsers: action.info}
    default:
      return state
  }
}
