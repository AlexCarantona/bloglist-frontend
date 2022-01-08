import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token}` },
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const addComment = async (comment, id) => {
  const config = {
    headers: { Authorization: `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token}` },
  }
  await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
}

const likeBlog = async blogLiked => {
  const increasedLikes = { ...blogLiked, likes: blogLiked.likes + 1 }
  delete increasedLikes.id
  delete increasedLikes.user
  const res = await axios.put(`${baseUrl}/${blogLiked.id}`, increasedLikes)
  return res.data
}

const deleteBlog = async deleteId => {
  const config = {
    headers: { Authorization: `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token}` },
  }
  const res = await axios.delete(`${baseUrl}/${deleteId}`, config)
  return res.status
}

export default { getAll, createBlog, likeBlog, deleteBlog, addComment }
