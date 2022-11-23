require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = async (request, response, next) => {
  try {
    const authorization = request.headers.authorization
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7)
    }

    const decodedToken = await jwt.verify(token, process.env.SECRET)

    if (token === null || decodedToken.admin !== true) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    next()
  } catch (err) {
    next(err)
  }
}
