import React, { useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'

import { allBlogs } from './reducers/blogReducer'
import { loadUser, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    dispatch(allBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUserJSON) {
      dispatch(loadUser(loggedUserJSON))
    }
  }, [])


  return (
    <div>
      <Notification />
      { !user ?
        <LoginForm />
        : <>
          <h2>Blogs</h2>
          <p>{user.username} is logged in</p>
          <button onClick={() => dispatch(logout())}>Log out</button>
          <Togglable buttonLabel='Add new blog'>
            <BlogForm />
          </Togglable>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              userInfo={user}
            />
          )}
        </>
      }
    </div>
  )
}

export default App
