import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <nav>
      <NavLink to='/users'>Users</NavLink>
      <NavLink to='/'>Blogs</NavLink>
      <span>{user.username} is logged in</span>
      <button onClick={() => dispatch(logout())}>Log out</button>
    </nav>
  )
}

export default Navbar
