import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState({});
  const [blogs, setBlogs] = useState([]);
  //User form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Blog form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs( blogs )
  };

  useEffect( async () => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user)
    }
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      );
      setUser(user);
      blogService.setToken(user.token)
      setUsername('');
      setPassword('');
    } catch (exception) {
    setNotification({ type: 'error', text: exception.response.data.error})
    setTimeout(() => setNotification({}), 5000)
    }
  };

  const newBlogHandler = async (event) => {
    event.preventDefault();
    blogService.setToken(user.token)
    const added = await blogService.createBlog({
      title,
      author,
      url
    });
    blogFormRef.current.toggle();
    setTitle('');
    setAuthor('');
    setUrl('');
    added.error
      ? setNotification({ type: 'error', text: added.error})
      : setNotification({ type: 'success', text: `${added.title} added to site.`});
    setTimeout(() => setNotification({}), 5000)
    fetchBlogs();
  };

  const logOut = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  return (
    <div>
    <Notification content={notification} />
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
        <BlogForm
          titleVar={title}
          titleHandler={({ target }) => setTitle(target.value)}
          authorVar={author}
          authorHandler={({ target }) => setAuthor(target.value)}
          urlVar={url}
          urlHandler={({ target }) => setUrl(target.value)}
          newBlogHandler={newBlogHandler}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    }
    </div>
  )
}

export default App
