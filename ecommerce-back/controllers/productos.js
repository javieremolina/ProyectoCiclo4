const productosRouter = require('express').Router()
const adminExtractor = require('../middleware/adminExtractor')
const Producto = require('../models/Producto')
const mongoose = require('mongoose')

productosRouter.get('/', (request, response) => {
  Producto.find({}).then(productos => {
    response.json(productos)
  })
})

productosRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  Producto.findById(id)
    .then(producto => {
      producto ? response.json(producto) : response.status(404).end()
    })
    .catch(error => { next(error) })
})

productosRouter.post('/', adminExtractor, async (request, response) => {
  const producto = request.body

  const nuevoProducto = new Producto({
    nombre_p: producto.nombre_p,
    categoria: producto.categoria,
    marca: producto.marca,
    precio: producto.precio,
    contenido: producto.contenido ? producto.contenido : '',
    imagenes: producto.imagenes,
    principal: producto.principal
  })

  const savedProducto = await nuevoProducto.save()

  response.json(savedProducto)
})

productosRouter.delete('/:id', adminExtractor, (request, response, next) => {
  const { id } = request.params
  Producto.findByIdAndDelete(id).then(() => {
    response.status(204).end()
  }).catch(error => { next(error) })
})

productosRouter.put('/:id', adminExtractor, async (request, response) => {
  const { id } = request.params
  const producto = request.body
  const productoDB = await Producto.findById(id)

  const productoActualizado = {
    nombre_p: producto.nombre_p ? producto.nombre_p : productoDB.nombre_p,
    categoria: producto.categoria ? producto.categoria : productoDB.categoria,
    marca: producto.marca ? producto.marca : productoDB.marca,
    precio: producto.precio ? producto.precio : productoDB.precio,
    contenido: producto.contenido ? producto.contenido : productoDB.contenido,
    imagenes: producto.imagenes ? producto.imagenes : productoDB.imagenes,
    principal: producto.principal ? producto.principal : productoDB.principal,
    carrito: producto.carrito ? producto.carrito.map(id => mongoose.Types.ObjectId(id)) : productoDB.carrito,
    comprado: producto.comprado ? producto.comprado.map(id => mongoose.Types.ObjectId(id)) : productoDB.comprado
  }

  Producto.findByIdAndUpdate(id, productoActualizado, { new: true })
    .then(updatedProduct => {
      response.json(updatedProduct)
    })
})

module.exports = productosRouter
