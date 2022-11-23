/* eslint-disable react/jsx-closing-tag-location */
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  useColorModeValue,
  List,
  ListItem,
  Spinner,
  ButtonGroup
} from '@chakra-ui/react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Carousel } from './Carousel'
import productService from '../services/productos'
import { GiShoppingCart } from 'react-icons/gi'
import { Rating } from './Rating'
import usuarioService from '../services/usuarios'

export const ProductDetails = ({ match }) => {
  const [data, setData] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  let gadgets = []

  useEffect(() => {
    productService.getOne(id)
      .then(res => {
        setData(res)
      })
      .catch(err => console.log(err))
  }, [])

  const handleClick = async () => {
    try {
      const userJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
      const userId = userJSON.id

      const usuarioACamabiar = await usuarioService.getOne(userId)

      const carrito = usuarioACamabiar.carrito.map(producto => producto.id)

      const nuevoCarrito = { carrito: [...carrito, `${id}`] }

      await usuarioService.update(userId, nuevoCarrito)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEliminar = async () => {
    try {
      await productService.remove(id)
    } catch (error) {
      console.log(error)
    }

    navigate('/productos')
  }

  if (data.length === 0) {
    return (
      <Flex justify='center'>
        <Spinner size='xl' thickness='4px' />
      </Flex>
    )
  } else {
    gadgets = Object.entries(data.principal)

    return (
      <Container maxW='7xl' alignItems='center'>
        <Flex
          alignItems='center'
          direction='column'
          py={24}
        >
          <Flex
            w='100%'
            minHeight='400px'
            justify='center'
          >
            <Flex
              direction='column'
              w='50%'
              borderWidth='1px'
              rounded='lg'
              shadow='1px 1px 3px rgba(0,0,0,0.3)'
              p='2rem'
            >
              <Flex h='70%'>
                <Carousel
                  imagenes={data.imagenes}
                />
              </Flex>
              <Flex alignItems='center' direction='column' gap={4} mt='3rem'>
                <Rating
                  rating={3.5}
                  numReviews={57}
                />

                {
                    (!(window.localStorage.getItem('loggedUser') && window.localStorage.getItem('loggedUser') !== undefined))
                      ? <ButtonGroup justifyContent='center'>
                        <Button variant='solid' colorScheme='facebook' onClick={handleClick} leftIcon={<GiShoppingCart />}>
                          Añadir al carrito
                        </Button>
                      </ButtonGroup>
                      : JSON.parse(window.localStorage.getItem('loggedUser')).admin !== true
                        ? <ButtonGroup justifyContent='center'>
                          <Button variant='solid' colorScheme='facebook' onClick={handleClick} leftIcon={<GiShoppingCart />}>
                            Añadir al carrito
                          </Button>
                        </ButtonGroup>
                        : <ButtonGroup justifyContent='center'>
                          <Button variant='solid' colorScheme='facebook' onClick={handleClick} leftIcon={<GiShoppingCart />}>
                            Añadir al carrito
                          </Button>
                          <Button variant='outline' colorScheme='facebook'>
                            <Link to={`/productos/modificar/${id}`}>
                              Modificar
                            </Link>
                          </Button>
                          <Button variant='solid' colorScheme='red' onClick={handleEliminar}>
                            Eliminar
                          </Button>
                        </ButtonGroup>
                }

              </Flex>
            </Flex>

            <Flex
              direction='column'
              ml='2rem'
              borderWidth='1px'
              rounded='lg'
              shadow='1px 1px 3px rgba(0,0,0,0.3)'
              p='2rem'
            >
              <Flex direction='column' mb='1.5rem' as='header'>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                >
                  {data.nombre_p}
                </Heading>
                <Text
                  color={useColorModeValue('gray.900', 'gray.400')}
                  fontWeight={300}
                  fontSize='2xl'
                >
                  Precio: ${data.precio}
                </Text>
              </Flex>

              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight='500'
                  textTransform='uppercase'
                  mb='4'
                >
                  Detalles del producto
                </Text>

                <List spacing={2}>
                  {
                  gadgets.map(([key, value]) => {
                    return (
                      <ListItem key={Math.random() * 1531}>
                        <Text as='span' fontWeight='bold'>
                          {key}
                        </Text>{': '}
                        {value}
                      </ListItem>
                    )
                  })
                }

                </List>
              </Box>
            </Flex>
          </Flex>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction='column'
            borderWidth='1px'
            rounded='lg'
            shadow='1px 1px 3px rgba(0,0,0,0.3)'
            p='2rem'
            mt='2rem'
          >
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight='500'
                textTransform='uppercase'
              >
                Informacion adicional
              </Text>
            </Box>
            <VStack className='setOverflow' spacing={{ base: 4, sm: 6 }}>
              <Text fontSize='lg'>
                {data.contenido}
              </Text>
            </VStack>
          </Stack>
        </Flex>
      </Container>
    )
  }
}
