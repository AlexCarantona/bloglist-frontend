import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitHandler = async (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title,
      author,
      url
    }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={submitHandler} id='newBlogForm'>
    Title:
      <input
        type='text'
        onChange={({ target }) => setTitle(target.value)}
        value={title}
        id='newTitle'
      />
    Author:
      <input
        type='text'
        onChange={({ target }) => setAuthor(target.value)}
        value={author}
        id='newAuthor'
      />
    URL:
      <input
        type='text'
        onChange={({ target }) => setUrl(target.value)}
        value={url}
        id='newUrl'
      />
      <button type='submit'>
    Save new blog
      </button>
    </form>
  )
}

export default BlogForm
