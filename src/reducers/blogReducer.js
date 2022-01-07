import con from '../services/blogs'

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
  case 'CREATE' : return state.concat(action.data)
  default: return state
  }
}

export default reducer
