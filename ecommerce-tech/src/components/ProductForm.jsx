import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Heading,
  Select,
  GridItem,
  Text,
  Textarea,
  Spinner
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productService from '../services/productos'

export const ProductForm = () => {
  const [imagenes, setImagenes] = useState([])
  const [precio, setPrecio] = useState('')
  const [marca, setMarca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [name, setName] = useState('')
  const [pantalla, setPantalla] = useState('')
  const [camara, setCamara] = useState('')
  const [bateria, setBateria] = useState('')
  const [desbloqueo, setDesbloqueo] = useState('')
  const [senal, setSenal] = useState('')
  const [capacidad, setCapacidad] = useState('')
  const [cpu, setCpu] = useState('')
  const [gpu, setGpu] = useState('')
  const [ram, setRam] = useState('')
  const [peso, setPeso] = useState('')
  const [contenido, setContenido] = useState('')
  const [data, setData] = useState([])

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    productService.getOne(id)
      .then(res => {
        setData(res)
        setImagenes(res.imagenes ? res.imagenes : [])
        setPrecio(res.precio ? res.precio : '')
        setMarca(res.marca ? res.marca : '')
        setCategoria(res.categoria ? res.categoria : '')
        setName(res.nombre_p ? res.nombre_p : '')
        setPantalla(res.principal.pantalla ? res.principal.pantalla : '')
        setCamara(res.principal.camara ? res.principal.camara : '')
        setBateria(res.principal.bateria ? res.principal.bateria : '')
        setDesbloqueo(res.principal.desbloqueo ? res.principal.desbloqueo : '')
        setSenal(res.principal.senal ? res.principal.senal : '')
        setCapacidad(res.principal.capacidad ? res.principal.capacidad : '')
        setCpu(res.principal.chip ? res.principal.chip : res.principal.cpu ? res.principal.cpu : '')
        setGpu(res.principal.gpu ? res.principal.gpu : '')
        setContenido(res.contenido ? res.contenido : '')
      })
      .catch(err => console.log(err))
  }, [])

  const handleImage1 = (e) => {
    const temp = [...imagenes]

    temp[0] = e.target.value

    setImagenes(temp)
  }

  const handleImage2 = (e) => {
    const temp = [...imagenes]

    temp[1] = e.target.value

    setImagenes(temp)
  }

  const handleImage3 = (e) => {
    const temp = [...imagenes]

    temp[2] = e.target.value

    setImagenes(temp)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let principal = {}

    if (categoria === 'telefono') {
      principal = {
        pantalla,
        chip: cpu,
        camara,
        bateria,
        desbloqueo,
        senal,
        capacidad,
        ram,
        peso
      }
    } else if (categoria === 'portatil') {
      principal = {
        pantalla,
        chip: cpu,
        gpu,
        camara,
        bateria,
        desbloqueo,
        capacidad,
        ram,
        peso
      }
    } else if (categoria === 'tablet') {
      principal = {
        pantalla,
        chip: cpu,
        camara,
        bateria,
        desbloqueo,
        capacidad,
        ram,
        peso
      }
    } else if (categoria === 'escritorio') {
      principal = {
        cpu,
        gpu,
        capacidad,
        ram
      }
    } else if (categoria === 'accesorio') {
      principal = {}
    }

    const newObject = {
      nombre_p: name,
      categoria,
      marca,
      precio: Number(precio),
      contenido,
      principal,
      imagenes
    }

    await productService.update(id, newObject).then(navigate('/productos'))
  }

  if (data.length === 0) {
    return (
      <Flex mt='10px' justify='center'>
        <Spinner size='xl' thickness='4px' />
      </Flex>
    )
  } else {
    return (
      <Flex w='full' h='full'>
        <Box
          borderWidth='1px'
          rounded='lg'
          shadow='1px 1px 3px rgba(0,0,0,0.3)'
          maxWidth='62.5rem'
          maxHeight='85vh'
          w='50rem'
          direction='column'
          p='1.5rem'
          pr='0.75rem'
          m='10px auto'
        >
          <Box
            className='setOverflow'
            maxWidth='50rem'
            h='full'
          >
            <form onSubmit={handleSubmit}>
              <Flex align='center' direction='column' minWidth='100%'>
                <Heading w='100%' textAlign='center' fontWeight='normal' my='1.25rem'>
                  Datos de Producto
                </Heading>

                <FormControl as={GridItem} colSpan='auto' mx='1.25rem' mb='1.25rem'>
                  <FormLabel>Imagenes del producto</FormLabel>
                  <Input
                    type='text'
                    value={imagenes[0]}
                    onChange={handleImage1}
                  />
                  <Input
                    type='text'
                    value={imagenes[1]}
                    onChange={handleImage2}
                  />
                  <Input
                    type='text'
                    value={imagenes[2]}
                    onChange={handleImage3}
                  />
                </FormControl>

                <Flex justify='center' w='full'>
                  <FormControl as={GridItem} colSpan='auto' mx='1.25rem' mb='1.25rem'>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan='auto' mx='1.25rem' mb='1.25rem'>
                    <FormLabel>Marca</FormLabel>
                    <Input
                      type='text'
                      value={marca}
                      onChange={(e) => setMarca(e.target.value)}
                    />
                  </FormControl>
                </Flex>

                <Flex justify='center' w='full'>
                  <FormControl as={GridItem} colSpan='auto' mx='1.25rem' mb='1.25rem'>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      autoComplete='off'
                      placeholder='Select option...'
                      value={categoria}
                      onChange={e => setCategoria(e.target.value)}
                    >
                      <option value='telefono'>
                        Telefono
                      </option>
                      <option value='tablet'>
                        Tablet
                      </option>
                      <option value='portatil'>
                        Portatil
                      </option>
                      <option value='escritorio'>
                        Escritorio
                      </option>
                      <option value='accesorio'>
                        Accesorio
                      </option>

                    </Select>
                  </FormControl>
                </Flex>

                <Flex style={categoria === 'accesorio' ? { height: '0px', visibility: 'hidden' } : { visibility: 'visible' }} align='center' direction='column' minWidth='100%'>
                  <Flex justify='center' w='full'>

                    <FormControl px='1.25rem' mb='1.25rem'>
                      <FormLabel>Pantalla</FormLabel>
                      <Input
                        type='text'
                        value={pantalla}
                        onChange={(e) => setPantalla(e.target.value)}
                      />
                    </FormControl>

                    <FormControl px='1.25rem' mb='1.25rem'>
                      <FormLabel>camara</FormLabel>
                      <Input
                        type='text'
                        value={camara}
                        onChange={(e) => setCamara(e.target.value)}
                      />
                    </FormControl>
                  </Flex>

                  <Flex justify='center' w='full'>
                    <FormControl px='1.25rem' mb='1.25rem'>
                      <FormLabel>CPU</FormLabel>
                      <Input
                        type='text'
                        value={cpu}
                        onChange={(e) => setCpu(e.target.value)}
                      />
                    </FormControl>

                    <FormControl px='1.25rem' mb='1.25rem'>
                      <FormLabel>GPU</FormLabel>
                      <Input
                        type='text'
                        value={gpu}
                        onChange={(e) => setGpu(e.target.value)}
                      />
                    </FormControl>
                  </Flex>

                  <Flex justify='center' w='full'>
                    <FormControl px='1.25rem' mb='1.25rem'>
                      <FormLabel>Bateria</FormLabel>
                      <Input
                        type='text'
                        value={bateria}
                        onChange={(e) => setBateria(e.target.value)}
                      />
                    </FormControl>

                    <FormControl px='1.25rem' mb='1.25rem'>
                      <FormLabel>Desbloqueo</FormLabel>
                      <Input
                        type='text'
                        value={desbloqueo}
                        onChange={(e) => setDesbloqueo(e.target.value)}
                      />
                    </FormControl>
                  </Flex>

                  <Flex justify='center' w='full'>
                    <FormControl px='1.25rem' mb='1.25rem'>
                      <FormLabel>Capacidad</FormLabel>
                      <Input
                        type='text'
                        value={capacidad}
                        onChange={(e) => setCapacidad(e.target.value)}
                      />
                    </FormControl>

                    <FormControl px='1.25rem' mb='1.25rem'>
                      <FormLabel>Ram</FormLabel>
                      <Input
                        type='text'
                        value={ram}
                        onChange={(e) => setRam(e.target.value)}
                      />
                    </FormControl>
                  </Flex>

                  <Flex justify='center' w='full'>
                    <FormControl px='1.25rem' mb='1.25rem'>
                      <FormLabel>Señal</FormLabel>
                      <Input
                        type='text'
                        value={senal}
                        onChange={(e) => setSenal(e.target.value)}
                      />
                    </FormControl>

                    <FormControl px='1.25rem' mb='1.25rem'>
                      <FormLabel>Peso</FormLabel>
                      <Input
                        type='text'
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                      />
                    </FormControl>
                  </Flex>
                </Flex>

                <Flex justify='center' w='full'>
                  <Text mb='8px'>Detalles:</Text>
                  <Textarea
                    value={contenido}
                    onChange={e => setContenido(e.target.value)}
                    size='sm'
                  />
                </Flex>

                <Flex justify='center' w='full'>
                  <FormControl px='1.25rem' mb='1.25rem'>
                    <FormLabel>Precio</FormLabel>
                    <Input
                      type='text'
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </FormControl>
                </Flex>

                <Center>
                  <Button
                    type='submit'
                    w='7rem'
                    colorScheme='facebook'
                    variant='solid'
                  >
                    Modificar
                  </Button>
                </Center>
              </Flex>
            </form>
          </Box>

        </Box>
      </Flex>
    )
  }
}
