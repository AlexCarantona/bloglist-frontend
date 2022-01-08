import con from '../services/login'
import { notify } from './notificationReducer'

export const loadUser = (user) => { return { type: 'LOAD', user }}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const userCredentials = await con.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(userCredentials))
      dispatch(loadUser(userCredentials))
    } catch (error) {dispatch(notify(error.response.data.error))}
  }
}

export const logout = () => { return { type: 'CLEAN' } }

const reducer = (state={}, action) => {
  switch (action.type) {
  case 'LOAD': return action.user
  case 'CLEAN': return state
  default: return state
  }
}

export default reducer
