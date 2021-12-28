import React, { useState } from 'react'

const BlogForm = ({ newBlogHandler }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitHandler = async (event) => {
    event.preventDefault()
    await newBlogHandler({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={submitHandler}>
    Title:
      <input
        type='text'
        onChange={({ target }) => setTitle(target.value)}
        value={title}
      />
    Author:
      <input
        type='text'
        onChange={({ target }) => setAuthor(target.value)}
        value={author}
      />
    URL:
      <input
        type='text'
        onChange={({ target }) => setUrl(target.value)}
        value={url}
      />
      <button type='submit'>
    Save new blog
      </button>
    </form>
  )
}

export default BlogForm
