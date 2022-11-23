/* eslint-disable react/jsx-handler-names */
import { useState } from 'react'
import usuarioService from '../services/usuarios'
import { colombia } from '../services/colombia'
import loginService from '../services/login'
import productService from '../services/productos'
import { useInView } from 'react-intersection-observer'

import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import './Extra/extraSettings.css'
import {
  Progress,
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Avatar,
  HStack,
  Center,
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  useBoolean
} from '@chakra-ui/react'

const listaDepartamentos = []

const Schema = Yup.object().shape({
  password: Yup.string().required('Campo requerido'),
  conPass: Yup.string().when('password', {
    is: val => (!!(val && val.length > 0)),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Las contraseñas no coinciden'
    )
  }),
  email: Yup.string().email('Ingrese un email valido').required('Campo requerido'),
  cedula: Yup.string().matches(/^[0-9]+$/i, 'Debe componerse de solo numeros')
    .min(5, 'Cédula muy corta')
    .required('Campo requerido'),
  nombres: Yup.string().matches(/^[A-Z]+$/i, 'Debe componerse de solo letras')
    .max(35, 'Máximo 35 caracteres')
    .required('Campo requerido'),
  apellidos: Yup.string().matches(/^[A-Z]+$/i, 'Debe componerse de solo letras')
    .max(35, 'Máximo 35 caracteres').required('Campo requerido'),
  telefono: Yup.string().min(10, 'El numero debe contener al menos 10 digitos')
    .required('Campo requerido'),
  direccion: Yup.string().required('Campo requerido'),
  avatar: Yup.string().matches(/^(https:\/\/)/, 'La URL debe comenzar con "https://"')
})

export const MultiStepForm = () => {
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(10)
  const [isEditing, setIsEditing] = useBoolean()
  const { ref: myRef, inView } = useInView()
  const [departamento, setDepartamento] = useState('')
  const [avatar, setAvatar] = useState('')
  const [ciudad, setCiudad] = useState('')

  const handleFinalSubmit = async (e) => {
    const newUserObject = {
      cedula: e.cedula,
      username: e.email,
      password: e.password,
      nombre_u: e.nombres,
      apellidos: e.apellidos,
      departamento,
      ciudad,
      direccion: e.direccion.toLowerCase(),
      telefono: e.telefono,
      avatar
    }

    try {
      await usuarioService.create(newUserObject)
        .then(async (returnedUser) => {
          try {
            const user = await loginService.login({
              username: returnedUser.username,
              password: e.password
            })
            productService.setToken(user.token)
            usuarioService.setToken(user.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            window.location.replace('/')
          } catch (error) { console.log(error.name) }
        })
    } catch (error) { console.log(error.name) }
  }

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
        <Progress
          ref={myRef}
          px='0.75rem'
          max={90}
          hasStripe
          value={progress}
          isAnimated
          colorScheme='blackAlpha'
        />
        <Box
          className='setOverflow'
          maxWidth='50rem'
          h='full'
        >
          <Formik
            initialValues={{
              nombres: '',
              apellidos: '',
              cedula: '',
              telefono: '',
              password: '',
              conPass: '',
              email: '',
              direccion: '',
              departamento: '',
              ciudad: ''
            }}
            validationSchema={Schema}
            onSubmit={handleFinalSubmit}
          >
            {
            ({ values, errors, touched }) => {
              return (
                <Form>
                  {/* DATOS DEL USUARIO */}
                  <Flex align='center' direction='column' minWidth='100%'>
                    <Heading w='100%' textAlign='center' fontWeight='normal' my='1.25rem'>
                      Datos de Usuario
                    </Heading>

                    <Flex justify='center' w='full'>
                      <FormControl as={GridItem} colSpan='auto' mx='1.25rem' mb='1.25rem' isInvalid={!!errors.nombres && touched.nombres}>
                        <FormLabel>Nombres</FormLabel>
                        <Field
                          as={Input}
                          name='nombres'
                          value={values.name}
                          placeholder='Ingrese sus nombres'
                        />
                        <FormErrorMessage>
                          {errors.nombres}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl as={GridItem} colSpan='auto' mx='1.25rem' mb='1.25rem' isInvalid={!!errors.apellidos && touched.apellidos}>
                        <FormLabel>Apellidos</FormLabel>
                        <Field
                          as={Input}
                          name='apellidos'
                          value={values.apellidos}
                          placeholder='Ingrese sus apellidos'
                        />
                        <FormErrorMessage>
                          {errors.apellidos}
                        </FormErrorMessage>
                      </FormControl>
                    </Flex>

                    <Flex justify='center' w='full'>
                      <FormControl as={GridItem} colSpan='auto' mx='1.25rem' mb='1.25rem' isInvalid={!!errors.cedula && touched.cedula}>
                        <FormLabel>Identificación</FormLabel>
                        <Field
                          as={Input}
                          name='cedula'
                          value={values.cedula}
                          placeholder='Digite su cédula'
                        />
                        <FormErrorMessage>
                          {errors.cedula}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl as={GridItem} colSpan='auto' mx='1.25rem' mb='1.25rem' isInvalid={!!errors.telefono && touched.telefono}>
                        <FormLabel>Telefono</FormLabel>
                        <Field
                          as={Input}
                          name='telefono'
                          value={values.telefono}
                          placeholder='Digite si numero de telefono'
                        />
                        <FormErrorMessage>
                          {errors.telefono}
                        </FormErrorMessage>
                      </FormControl>
                    </Flex>

                    {/* DATOS DEL CUENTA */}
                    <Heading w='100%' textAlign='center' fontWeight='normal' my='1.25rem'>
                      Datos de cuenta
                    </Heading>

                    <Center>
                      <Popover
                        isOpen={isEditing}
                        onOpen={setIsEditing.on}
                        onClose={setIsEditing.off}
                        closeOnBlur={false}
                        isLazy
                        lazyBehavior='keepMounted'
                      >
                        <HStack>
                          <Avatar size='xl' src={avatar.length > 10 ? avatar : 'https://bit.ly/broken-link'} />

                          <PopoverAnchor>
                            <FormControl px='1.25rem' mb='1.25rem' isInvalid={!!errors.avatar && touched.avatar}>
                              <FormLabel>Imagen de perfil</FormLabel>
                              <Field
                                as={Input}
                                name='avatar'
                                w='auto'
                                value={values.avatar}
                                display='inline-flex'
                                isDisabled={!isEditing}
                                placeholder='Inserte la url de una imagen'
                                onChange={e => setAvatar(e.target.value)}
                              />
                              <FormErrorMessage>
                                {errors.avatar}
                              </FormErrorMessage>
                            </FormControl>
                          </PopoverAnchor>

                          <PopoverTrigger>
                            <Button
                              h='40px'
                              colorScheme='pink'
                            >
                              {isEditing ? 'Guardar' : 'Modificar'}
                            </Button>
                          </PopoverTrigger>

                        </HStack>
                      </Popover>
                    </Center>

                    <FormControl px='1.25rem' mb='1.25rem' isInvalid={!!errors.email && touched.email}>
                      <FormLabel>Email</FormLabel>
                      <Field
                        as={Input}
                        name='email'
                        type='email'
                        value={values.email}
                        placeholder='Ingrese su email'
                      />
                      <FormErrorMessage>
                        {errors.email}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl px='1.25rem' mb='1.25rem' isInvalid={!!errors.password && touched.password}>
                      <FormLabel>Contraseña</FormLabel>
                      <InputGroup size='md'>
                        <Field
                          as={Input}
                          autoComplete='off'
                          name='password'
                          type={show ? 'text' : 'password'}
                          value={values.password}
                          placeholder='Ingrese su contraseña'
                        />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.password}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl px='1.25rem' mb='1.25rem' isInvalid={!!errors.conPass && touched.conPass}>
                      <FormLabel>Confirmar Contraseña</FormLabel>
                      <InputGroup size='md'>
                        <Field
                          as={Input}
                          autoComplete='off'
                          name='conPass'
                          value={values.conPass}
                          placeholder='Vuelva a ingresar su contraseña'
                          type={show ? 'text' : 'password'}
                        />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.conPass}</FormErrorMessage>
                    </FormControl>

                    {/* DATOS DE ENVIO */}

                    <Heading w='100%' textAlign='center' fontWeight='normal' my='1.25rem'>
                      Información De Envíos
                    </Heading>

                    <Flex justify='center' w='full'>
                      <FormControl as={GridItem} colSpan='auto' mx='1.25rem' mb='1.25rem'>
                        <FormLabel>Departamento</FormLabel>
                        <Select
                          name='departamento'
                          autoComplete='off'
                          placeholder='Select option...'
                          onChange={e => { setDepartamento(e.target.value) }}
                        >
                          {
                            colombia.map(({ id, departamento }) => {
                              listaDepartamentos.push(departamento)
                              return (
                                <option key={id} value={departamento}>
                                  {departamento}
                                </option>
                              )
                            })
                          }
                        </Select>
                        <FormErrorMessage>
                          {errors.departamento}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl as={GridItem} colSpan='auto' mx='1.25rem' mb='1.25rem'>
                        <FormLabel>Ciudad</FormLabel>
                        <Select
                          isInvalid={!!errors.ciudad && touched.ciudad}
                          name='ciudades'
                          placeholder='Select option...'
                          autoComplete='off'
                          onChange={e => setCiudad(e.target.value)}
                        >
                          {
                            departamento !== ''
                              ? colombia
                                .filter(region => region.departamento === departamento)[0]
                                .ciudades.map(city => {
                                  return (
                                    <option key={city} value={city}>
                                      {city}
                                    </option>
                                  )
                                })
                              : <option value=''>Select option...</option>
                          }

                        </Select>
                        <FormErrorMessage>
                          {errors.ciudad}
                        </FormErrorMessage>
                      </FormControl>
                    </Flex>

                    <FormControl px='1.25rem' mb='1.25rem' isInvalid={!!errors.direccion && touched.direccion}>
                      <FormLabel>Dirección</FormLabel>
                      <Field
                        as={Input}
                        type='text'
                        name='direccion'
                        placeholder='Ingrese su direccion de envio'
                      />
                      <FormErrorMessage>
                        {errors.direccion}
                      </FormErrorMessage>
                    </FormControl>

                    <Center>
                      <Button
                        ref={myRef}
                        type='submit'
                        w='7rem'
                        colorScheme='facebook'
                        variant='solid'
                      >{inView ? setProgress(100) : setProgress(50)}
                        Submit
                      </Button>
                    </Center>
                  </Flex>
                </Form>
              )
            }
          }
          </Formik>
        </Box>

      </Box>
    </Flex>
  )
}
