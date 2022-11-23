/* eslint-disable camelcase */
import { CloseButton, Flex, Select, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'
import usuarioService from '../services/usuarios'

const QuantitySelect = (props) => {
  return (
    <Select
      maxW='64px'
      aria-label='Select quantity'
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
    >
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
    </Select>
  )
}

export const CartItem = (props) => {
  const [quantity, setQuantity] = React.useState(1)
  const {
    id,
    nombre_p,
    precio,
    imagenes
  } = props

  const onClickDelete = async () => {
    try {
      const userJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
      const userId = userJSON.id

      const usuarioACamabiar = await usuarioService.getOne(userId)

      const filtradoCarrito = usuarioACamabiar.carrito.filter(idProducto => idProducto.id !== `${id}`)
      const nuevoCarrito = { carrito: filtradoCarrito.map(producto => producto.id) }

      await usuarioService.update(userId, nuevoCarrito)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row'
      }}
      justify='space-between'
      align='center'
    >
      <CartProductMeta
        name={nombre_p}
        image={imagenes[0]}
      />

      {/* Desktop */}
      <Flex
        width='full'
        justify='space-between'
        display={{
          base: 'none',
          md: 'flex'
        }}
      >
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value)
          }}
        />
        <PriceTag price={precio} />
        <CloseButton aria-label={`Borrar ${nombre_p} del carrito`} onClick={onClickDelete} />
      </Flex>
    </Flex>
  )
}
