import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { Routes, Route } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { loadUser, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUserJSON) {
      dispatch(loadUser(loggedUserJSON))
    }
  }, [])


  return (
    <div>
      <Notification />
      { !user.token ?
        <LoginForm />
        :<>
          <p>{user.username} is logged in</p>
          <button onClick={() => dispatch(logout())}>Log out</button>
          <Togglable buttonLabel='Add new blog'>
            <BlogForm />
          </Togglable>
          <Routes>
            <Route path='/users' element={<UserList />} />
            <Route path='/' element={<BlogList />} />
          </Routes>
        </>
      }
    </div>
  )
}

export default App
