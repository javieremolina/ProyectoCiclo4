import { useState } from 'react'
import loginService from '../services/login'
import productService from '../services/productos'
import { BiShow, BiHide } from 'react-icons/bi'
import './Extra/extraSettings.css'
import userService from '../services/usuarios'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

export const LoginForm = ({ userState }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username: email,
        password
      })

      productService.setToken(user.token)
      userService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      window.location.replace('/')
    } catch {
      console.log('Usuario o contraseña incorrectos')
    }
  }

  return (
    <Flex
      minH='100vh'
      mt={4}
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >

      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize='4xl' textAlign='center'>
            Inicia Tu Sesión
          </Heading>
          <Text fontSize='lg' color='gray.600'>
            para disfrutar de nuestros productos ✌️
          </Text>
        </Stack>

        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={6} w='400px'
        >
          <form onSubmit={handleLogin}>
            <FormControl id='email' isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                size='lg'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Ingrese su Email'
              />
            </FormControl>

            <FormControl mt={5} id='password' isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  size='lg'
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Inserte su contraseña'
                />
                <InputRightElement h='full'>
                  <Button
                    variant='ghost'
                    p='0'
                    mr='5px'
                    onClick={() => setShow(!show)}
                  >
                    {show ? <BiShow h='full' w='full' /> : <BiHide />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} mt='2rem'>
              <Button
                type='submit'
                loadingText='Iniciando'
                size='lg'
                bg='blue.400'
                color='white'
                _hover={{ bg: 'blue.500' }}
              >
                Iniciar Sesión
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
