import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { like, deleteBlog, addComment } from '../reducers/blogReducer'

const SingleBlog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = useSelector(state =>
    state.blogs.find(b => b.id === id))

  const userInfo = useSelector(state => state.user)

  const handleComment = event => {
    event.preventDefault()
    dispatch(
      addComment(
        event.target.commentField.value,
        blog.id
      )
    )
  }

  const blogStyle = {
    borderWidth: 1,
    border: 'solid',
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <span>
        <h1><i>{blog.title}</i> by {blog.author}</h1>
      </span>
      <section className='blogDetails'>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}<button onClick={() => dispatch(like(blog))}>Like it!</button></p>
        <p>Added by: {blog.user.username}</p>
        {blog.user.username === userInfo.username
        && <button onClick={() => {
          dispatch(deleteBlog(blog.id))
          navigate('/')
        }}>Delete</button>}
      </section>
      <section className='comments'>
        <h2>Comments</h2>
        <form onSubmit={(e) => handleComment(e)} >
          <input
            type='text'
            name='commentField'
            placeholder='Add your comment...'
            id='commentInput'
          />
          <button type='submit'>Send</button>
        </form>
        <ul>
          {blog.comments.map(com => <li key={com}>{com}</li>)}
        </ul>
      </section>
    </div>
  )
}

export default SingleBlog
