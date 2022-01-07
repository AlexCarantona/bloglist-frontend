import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'

import { notify } from './reducers/notificationReducer'
import { allBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  //User form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(allBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const submitHandler = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(notify(exception.response.data.error))
    }
  }

  const upLikeBlog = async (blogObject) => {
    const updated = await blogService.likeBlog(blogObject)
    dispatch(notify(`You liked ${updated.title}!` ))
    dispatch(allBlogs())
  }

  const deleteBlog = async deleteCandidate => {
    blogService.setToken(user.token)
    window.confirm(`You want to delete ${deleteCandidate.title}?`)
      ? await blogService.deleteBlog(deleteCandidate.id)
      : ''
    dispatch(notify('Post erased.' ))
    dispatch(allBlogs())
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div>
      <Notification />
      { user === null ?
        <LoginForm
          userVar={username}
          userHandler={(e) => setUsername(e.target.value)}
          passwordVar={password}
          passwordHandler={(e) => setPassword(e.target.value)}
          submitHandler={submitHandler}
        />
        : <>
          <h2>Blogs</h2>
          <p>{user.username} is logged in</p>
          <button onClick={logOut}>Log out</button>
          <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateHandler={upLikeBlog}
              userInfo={user}
              deleteHandler={deleteBlog}
            />
          )}
        </>
      }
    </div>
  )
}

export default App
