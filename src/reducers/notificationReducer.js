export const cleanUp = () => {return { type: 'CLEANUP' }}

export const setTimer = (timer) => {return { type: 'SETTIMER', timer }}

export const notify = (message) => {
  return async dispatch => {
    await dispatch({ type: 'NOTIFY', message })
    const timer = setTimeout(() => dispatch(cleanUp()), 5000)
    dispatch(setTimer(timer))
  }
}

const reducer = (state={}, action) => {
  switch (action.type) {
  case 'NOTIFY': return { message: action.message }
  case 'CLEANUP': return { message: '' }
  case 'SETTIMER': return { ...state, timer: action.timer }
  default: return state
  }
}

export default reducer
