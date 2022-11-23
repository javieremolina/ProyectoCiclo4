const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const userExtractor = require('../middleware/userExtractor')
const adminExtractor = require('../middleware/adminExtractor')
const User = require('../models/User')
const mongoose = require('mongoose')

usersRouter.get('/', adminExtractor, (request, response) => {
  User.find({}).then(usuarios => {
    response.json(usuarios)
  })
})

usersRouter.get('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  await User.findById(id).populate('carrito', { nombre_p: 1, precio: 1, imagenes: 1 })
    .then(usuario => {
      usuario
        ? response.json(usuario)
        : response.status(404).send(
          { error: 'Usuario no encontrado' }
        ).end()
    })
    .catch(error => { next(error) })
})

usersRouter.post('/', async (request, response) => {
  const { body } = request

  const SALTROUNDS = 10
  const passwordHash = await bcrypt.hash(body.password, SALTROUNDS)

  const user = new User({
    admin: false,
    cedula: body.cedula,
    username: body.username,
    passwordHash,
    nombre_u: body.nombre_u,
    apellidos: body.apellidos,
    telefono: body.telefono,
    avatar: body.avatar,
    infoEnvio: {
      departamento: body.departamento,
      ciudad: body.ciudad,
      direccion: body.direccion
    },
    carrito: [],
    comprado: []
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (err) {
    console.log(err.name)
    response.status(400).send({ error: 'username must be unique' })
  }
})

usersRouter.delete('/:id', adminExtractor, (request, response, next) => {
  const { id } = request.params
  User.findByIdAndRemove(id).then(() => {
    response.status(204).end()
  }).catch(error => { next(error) })
})

usersRouter.put('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const body = request.body

  try {
    const user = await User.findById(id)
    const usuarioActualizado = {
      admin: body.admin ? body.admin : user.admin,
      cedula: body.cedula ? body.cedula : user.cedula,
      username: body.username ? body.username : user.username,
      nombre_u: body.nombre_u ? body.nombre_u : user.nombre_u,
      apellidos: body.apellidos ? body.apellidos : user.apellidos,
      telefono: body.telefono ? body.telefono : user.telefono,
      avatar: body.avatar ? body.avatar : user.avatar,
      infoEnvio: body.infoEnvio ? body.infoEnvio : user.infoEnvio,
      carrito: body.carrito ? body.carrito.map(id => mongoose.Types.ObjectId(id)) : user.carrito,
      comprado: body.comprado ? body.comprado.map(id => mongoose.Types.ObjectId(id)) : user.comprado
    }
    await User.findByIdAndUpdate(id, usuarioActualizado, { new: true })
  } catch (err) {
    next(err)
  }
})

module.exports = usersRouter
