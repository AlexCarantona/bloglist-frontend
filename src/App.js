import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });
      setUser(user);
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
    { user === null ?
      <LoginForm
        userVar={username}
        userHandler={(e) => setUsername(e.target.value)}
        passwordVar={password}
        passwordHandler={(e) => setPassword(e.target.value)}
        submitHandler={submitHandler}
      />
      : <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />

      )}
      </>
    }
    </div>
  )
}

export default App
