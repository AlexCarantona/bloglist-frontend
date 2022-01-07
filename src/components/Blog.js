import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, userInfo }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    borderWidth: 1,
    border: 'solid',
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const detailsStyle = visible
    ? { display: '' }
    : { display: 'none' }


  return (
    <div style={blogStyle} className='blogInfo'>
      <span className='blogHeader'>
        <i>{blog.title}</i> by {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'Hide' : 'Details'}
        </button>
      </span>
      <section style={detailsStyle} className='blogDetails'>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}<button onClick={() => dispatch(like(blog))}>Like it!</button></p>
        <p>Added by: {blog.user.username}</p>
        {blog.user.username === userInfo?.username
        && <button onClick={() => dispatch(deleteBlog(blog.id))}>Delete</button>}
      </section>
    </div>
  )
}

export default Blog
