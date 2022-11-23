const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  admin: Boolean,
  cedula: String,
  username: {
    type: String,
    unique: true
  },
  passwordHash: String,
  nombre_u: String,
  apellidos: String,
  telefono: String,
  avatar: String,
  infoEnvio: {
    departamento: String,
    ciudad: String,
    direccion: String
  },
  carrito: [{
    type: Schema.Types.ObjectId,
    ref: 'Producto'
  }],
  comprado: [{
    type: Schema.Types.ObjectId,
    ref: 'Producto'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const Usuario = model('Usuario', userSchema)

module.exports = Usuario
