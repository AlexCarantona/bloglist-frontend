import con from '../services/blogs'
import { notify } from './notificationReducer'

export const deleteBlog = blogId => {
  return async dispatch => {
    const confirmation = window.confirm('You want to delete this post?')
    if (confirmation){
      await con.deleteBlog(blogId)
      dispatch(notify('Post erased.'))
    }
    dispatch(allBlogs())
  }
}

export const addComment = (comment, blogid) => {
  return async dispatch => {
    await con.addComment(comment, blogid)
    dispatch(allBlogs())
  }
}

export const like = data => {
  return async dispatch => {
    await con.likeBlog(data)
    dispatch(allBlogs())
  }
}

export const createBlog = data => {
  return async dispatch => {
    const newBlog = await con.createBlog(data)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })

  }
}

export const allBlogs = () => {
  return async dispatch => {
    const blogs = await con.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: blogs.sort((a, b) => b.likes - a.likes)
    })
  }
}

const reducer = (state=[], action) => {
  switch (action.type) {
  case 'INITIALIZE': return action.data
  case 'CREATE': return state.concat(action.data)
  default: return state
  }
}

export default reducer
