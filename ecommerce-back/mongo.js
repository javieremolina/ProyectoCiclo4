const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

// coneccion a mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectado a la base de datos')
  })
  .catch((err) => {
    console.log(err)
  })

process.on('uncaughtException', () => {
  mongoose.disconnect()
})
