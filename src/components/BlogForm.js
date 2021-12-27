import React from 'react';

const BlogForm = (props) => {
  return (
    <form onSubmit={props.newBlogHandler}>
    Title:
    <input
      type='text'
      onChange={props.titleHandler}
      value={props.titleVar}
    />
    Author:
    <input
      type='text'
      onChange={props.authorHandler}
      value={props.authorVar}
    />
    URL:
    <input
      type='text'
      onChange={props.urlHandler}
      value={props.urlVar}
    />
    <button type='submit'>
    Save new blog
    </button>
    </form>
  )
};

export default BlogForm;
