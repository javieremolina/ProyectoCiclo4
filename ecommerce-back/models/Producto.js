const { model, Schema } = require('mongoose')

const productoSchema = new Schema({
  nombre_p: String,
  categoria: String,
  marca: String,
  precio: Number,
  contenido: String,
  imagenes: [String],
  principal: Object,
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
})

productoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Producto = model('Producto', productoSchema)

module.exports = Producto
