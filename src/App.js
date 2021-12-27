import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  //User form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Blog form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);

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
      console.log(exception)
    }
  };

  const newBlogHandler = async (event) => {
    event.preventDefault();
    blogService.setToken(user.token)
    await blogService.createBlog({
      title,
      author,
      url
    });
    fetchBlogs();
  };

  const logOut = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

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
      <p>{user.username} is logged in</p>
      <button onClick={logOut}>Log out</button>
      <BlogForm
        titleVar={title}
        titleHandler={({ target }) => setTitle(target.value)}
        authorVar={author}
        authorHandler={({ target }) => setAuthor(target.value)}
        urlVar={url}
        urlHandler={({ target }) => setUrl(target.value)}
        newBlogHandler={newBlogHandler}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    }
    </div>
  )
}

export default App
