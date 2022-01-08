import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            <Link
              to={`/blogs/${blog.id}`}
            >
              {blog.title} by {blog.author}
            </Link>
          </li>
        )}
      </ul>
    </>
  )
}

export default BlogList
