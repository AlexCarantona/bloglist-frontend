import Blog from './Blog'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allBlogs } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  return (
    <>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          userInfo={user}
        />
      )}
    </>
  )
}

export default BlogList
