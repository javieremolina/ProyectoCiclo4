module.exports = (error, request, response, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    response.status(400).end()
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'token missing or invalid' })
  } else {
    response.status(500).end()
  }
}
