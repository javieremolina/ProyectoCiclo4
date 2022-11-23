require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username } = body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username,
    admin: user.admin
  }

  const token = await jwt.sign(userForToken, process.env.SECRET)

  response.send({
    id: user._id,
    admin: user.admin,
    username: user.username,
    name: `${user.nombre_u} ${user.apellidos}`,
    avatar: user.avatar,
    token
  })
})

module.exports = loginRouter
