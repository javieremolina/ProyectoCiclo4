module.exports = (error, request, response, next) => {
  if (error) {
    response.status(404).send({ error: 'La ruta no existe' })
  }
}
