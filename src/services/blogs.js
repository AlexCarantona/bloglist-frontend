import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token},
  }

  const res = await axios.post(baseUrl, newBlog, config);
  return res.data
}

export default { getAll, createBlog, setToken }
