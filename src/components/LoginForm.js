import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const loginHandle = (e) => {
    e.preventDefault()
    const target = e.target
    dispatch(login({
      username: target.username.value,
      password: target.password.value
    }))
  }

  return (
    <form onSubmit={loginHandle} id='loginForm'>

      <label htmlFor='loginUsername'>Username</label>
      <input
        type='text'
        name='username'
        id='loginUsername'
      />

      <label htmlFor='loginPassword'>Password</label>
      <input
        type='password'
        name='password'
        id='loginPassword'
      />
      <button type='submit' id='loginButton'>Login</button>
    </form>
  )
}

export default LoginForm
