import axios from 'axios'

const baseurl = 'http://localhost:3001/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.get(baseurl, config)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.get(`${baseurl}/${id}`, config)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseurl, newObject)
  return request.then(response => response.data)
}

const update = async (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  return await axios.put(`${baseurl}/${id}`, newObject, config).then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getOne, create, update, setToken }
