import axios from 'axios'

const baseurl = 'http://localhost:3001/api/products'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseurl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseurl}/${id}`)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseurl, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${baseurl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.delete(`${baseurl}/${id}`, config)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getOne, create, update, remove, setToken }
