import {
  Box,
  Flex,
  Heading,
  Spinner,
  Stack
} from '@chakra-ui/react'
import * as React from 'react'
import { CartItem } from './CartItem'
import { CartOrderSummary } from './CartOrderSummary'
import usuarioService from '../services/usuarios'
import { useState, useEffect } from 'react'

export const CarritoPage = () => {
  const [cartData, setCartData] = useState([])

  let precios = []

  useEffect(() => {
    try {
      const userJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
      const userId = userJSON.id

      const getCartData = async (id) => {
        const response = await usuarioService.getOne(id)
        await setCartData(response.carrito)
      }

      getCartData(userId)
    } catch (error) {
      console.log(error.name)
    }
  }, [])

  if (cartData.length === 0) {
    return (
      <Flex mt='10px' justify='center'>
        <Spinner size='xl' thickness='4px' />
      </Flex>
    )
  } else {
    return (
      <Box
        maxW={{
          base: '3xl',
          lg: '7xl'
        }}
        mx='auto'
        px={{
          base: '4',
          md: '8',
          lg: '12'
        }}
        py={{
          base: '6',
          md: '8',
          lg: '12'
        }}
      >
        <Stack
          direction={{
            base: 'column',
            lg: 'row'
          }}
          align={{
            lg: 'flex-start'
          }}
          spacing={{
            base: '8',
            md: '16'
          }}
        >
          <Stack
            spacing={{
              base: '8',
              md: '10'
            }}
            flex='2'
          >
            <Heading fontSize='2xl' fontWeight='extrabold'>
              Carrito de compras ({`${cartData.length} productos`})
            </Heading>

            <Stack spacing='6'>
              {
                cartData.map((producto) => {
                  precios = [...precios, Number(producto.precio)]
                  return (
                    <CartItem key={producto.id} setCartData={setCartData} {...producto} />
                  )
                })
              }
            </Stack>
          </Stack>

          <Flex direction='column' align='center' flex='1'>
            <CartOrderSummary precio={precios.reduce((a, b) => a + b, 0)} />
          </Flex>
        </Stack>
      </Box>
    )
  }
}
