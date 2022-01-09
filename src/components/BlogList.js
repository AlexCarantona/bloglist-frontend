import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@mui/material'

const BlogList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <h2>Blogs</h2>
      <List>
        {blogs.map(blog =>
          <ListItem
            key={blog.id}
            component={Link}
            to={`/blogs/${blog.id}`}
          >
            <ListItemText primary={`${blog.title} by ${blog.author}`} />
          </ListItem>
        )}
      </List>
    </>
  )
}

export default BlogList
