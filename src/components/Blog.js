import React, { useState } from 'react'
const Blog = ({ blog, updateHandler }) => {
  const blogStyle = {
    borderWidth: 1,
    border: 'solid',
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const detailsStyle = visible
    ? {display: ''}
    : {display: 'none'}

  return (
  <div style={blogStyle}>
    <span>
      <i>{blog.title}</i> by {blog.author}
      <button onClick={() => setVisible(!visible)}>
      {visible ? 'Hide' : 'Details'}
      </button>
    </span>
    <section style={detailsStyle}>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}<button onClick={() => updateHandler(blog)}>Like it!</button></p>
      <p>Added by: {blog.user.username}</p>
    </section>
  </div>
)
};

export default Blog
