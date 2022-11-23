import { GoDeviceMobile, GoDeviceDesktop } from 'react-icons/go'
import { MdLaptopMac, MdHeadphones, MdDevices } from 'react-icons/md'
import { GiTablet } from 'react-icons/gi'
import { ProductCard } from './ProductCard'
import productService from '../services/productos'
import { IconContext } from 'react-icons'
import { useParams } from 'react-router-dom'
import {
  Flex,
  Box,
  Wrap,
  WrapItem,
  Button,
  Spinner
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export const ProductPageMarca = () => {
  const [data, setData] = useState([])
  const [categoria, setCategoria] = useState('all')
  const { marca } = useParams()

  useEffect(() => {
    productService.getAll()
      .then(res => {
        setData(res.filter(producto => producto.marca === marca))
      })
      .catch(err => console.log(err))
  }, [marca])

  const handleClickTelefono = () => {
    setCategoria('telefono')
  }

  const handleClickTablet = () => {
    setCategoria('tablet')
  }

  const handleClickEscritorio = () => {
    setCategoria('escritorio')
  }

  const handleClickPortatil = () => {
    setCategoria('portatil')
  }

  const handleClickAccesorio = () => {
    setCategoria('accesorio')
  }

  const handleClickAll = () => {
    setCategoria('all')
  }

  if (data.length === 0) {
    return (
      <Flex justify='center'>
        <Spinner size='xl' thickness='4px' />
      </Flex>
    )
  } else {
    return (
      <>
        <Flex mx='15%' h='150px' w='70%' justify='space-evenly' align='center'>

          <Flex h='100%' align='center'>
            <Flex align='center' direction='column' as={Button} onClick={handleClickAll}>
              <IconContext.Provider value={{ size: '3em' }}>
                <MdDevices />
                <span>Todos</span>
              </IconContext.Provider>
            </Flex>
          </Flex>

          <Flex h='100%' align='center'>
            <Flex align='center' direction='column' as={Button} onClick={handleClickTelefono}>
              <IconContext.Provider value={{ size: '3em' }}>
                <GoDeviceMobile />
                <span>Telefonos</span>
              </IconContext.Provider>
            </Flex>
          </Flex>

          <Flex h='100%' align='center'>
            <Flex align='center' direction='column' as={Button} onClick={handleClickTablet}>
              <IconContext.Provider value={{ size: '3em' }}>
                <GiTablet />
                <span>Tablets</span>
              </IconContext.Provider>
            </Flex>
          </Flex>

          <Flex h='100%' align='center'>
            <Flex align='center' direction='column' as={Button} onClick={handleClickEscritorio}>
              <IconContext.Provider value={{ size: '3em' }}>
                <GoDeviceDesktop />
                <span>Escritorio</span>
              </IconContext.Provider>
            </Flex>
          </Flex>

          <Flex h='100%' align='center'>
            <Flex align='center' direction='column' as={Button} onClick={handleClickPortatil}>
              <IconContext.Provider value={{ size: '3em' }}>
                <MdLaptopMac />
                <span>Portatiles</span>
              </IconContext.Provider>
            </Flex>
          </Flex>

          <Flex h='100%' align='center'>
            <Flex align='center' direction='column' as={Button} onClick={handleClickAccesorio}>
              <IconContext.Provider value={{ size: '3em' }}>
                <MdHeadphones />
                <span>Accesorio</span>
              </IconContext.Provider>
            </Flex>
          </Flex>
        </Flex>

        <Box>
          <Wrap justify='center' spacing='10px'>
            {
            data.filter(res => categoria === 'all' ? res : res.categoria === categoria)
              .map(producto => {
                return (
                  <WrapItem key={producto.id}>
                    <ProductCard
                      idProducto={producto.id}
                      name={producto.nombre_p}
                      marca={producto.marca}
                      precio={producto.precio}
                      imagenes={producto.imagenes}
                    />
                  </WrapItem>
                )
              })
          }

          </Wrap>
        </Box>

      </>
    )
  }
}
