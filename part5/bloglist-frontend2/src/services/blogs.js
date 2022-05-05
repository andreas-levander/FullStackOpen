import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config);
  return response.data; 
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config);
  return response.data; 
}

export { getAll, setToken, createBlog }