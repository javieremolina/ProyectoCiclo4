require('dotenv').config()
require('./mongo')
const cors = require('cors')
const express = require('express')
const app = express()
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const usersRouter = require('./controllers/users')
const productosRouter = require('./controllers/productos')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(express.static('../ecommerce-tech/build'))

app.use('/api/products', productosRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
