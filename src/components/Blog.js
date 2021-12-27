import React from 'react'
const Blog = ({blog}) => (
  <div>
    <i>{blog.title}</i> by {blog.author}
  </div>
)

export default Blog
