import React from 'react'
import { Rating } from './Rating'
import { Carousel } from './Carousel'
import { Link } from 'react-router-dom'
import usuarioService from '../services/usuarios'
import {
  Card,
  CardBody,
  CardFooter
} from '@chakra-ui/card'

import {
  Heading,
  Text,
  Button,
  Divider,
  Stack,
  Center,
  Box
} from '@chakra-ui/react'

export const ProductCard = ({ name, precio, marca, imagenes, idProducto }) => {
  const camelize = (marca) => {
    const marcaMelized = marca.split('')[0].toUpperCase() + marca.slice(1)
    return marcaMelized
  }

  const handleCarrito = async () => {
    try {
      const userJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
      const userId = userJSON.id

      const usuarioACamabiar = await usuarioService.getOne(userId)

      const carrito = usuarioACamabiar.carrito.map(producto => producto.id)

      const nuevoCarrito = { carrito: [...carrito, `${idProducto}`] }

      await usuarioService.update(userId, nuevoCarrito)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box borderWidth='1px' w='300px' boxShadow='2xl'>
      <Card maxW='sm'>
        <CardBody>
          <Carousel imagenes={imagenes} />
          <Link to={`/productos/${idProducto}`}>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{name}</Heading>
              <Text>
                Un producto de: {camelize(marca)}
              </Text>
              <Rating rating={/* data.rating */Number(4.2)} numReviews={/* numReviews */Number(34)} />
              <Text color='blue.600' fontSize='2xl'>
                ${precio}
              </Text>
            </Stack>
          </Link>
        </CardBody>
        <Divider />
        <CardFooter>
          <Center spacing='2'>
            <Button variant='solid' colorScheme='facebook' onClick={handleCarrito}>
              Agregar al carrito
            </Button>
          </Center>
        </CardFooter>
      </Card>
    </Box>
  )
}
