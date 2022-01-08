import con from '../services/users'

export const allUsers = () => {
  return async dispatch => {
    const users = await con.getAll()
    dispatch({ type: 'FETCHALL', users })
  }
}

const reducer = (state=[], action) => {
  switch (action.type) {
  case 'FETCHALL' : return action.users
  default : return state
  }
}

export default reducer
