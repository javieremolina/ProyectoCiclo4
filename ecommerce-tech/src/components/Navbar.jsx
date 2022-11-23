/* eslint-disable camelcase */
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { AiFillHome } from 'react-icons/ai'
import './Navbar/Navbar.css'
import {
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Icon,
  Container,
  Divider,
  Center,
  Box,
  Flex,
  Spinner
} from '@chakra-ui/react'
import { LinkNav } from './LinkNav'
import { useState, useEffect } from 'react'
import productService from '../services/productos'

export const Navbar = ({ userState }) => {
  const [marca, setMarca] = useState([])

  useEffect(() => {
    productService.getAll()
      .then(res => {
        const findDuplicates = (arr) => {
          const sorted_arr = arr.slice().sort()
          const results = []
          for (let i = 0; i < sorted_arr.length - 1; i++) {
            if (sorted_arr[i + 1] === sorted_arr[i] && sorted_arr[i - 1] !== sorted_arr[i]) {
              results.push(sorted_arr[i])
            }
            if (sorted_arr[i + 1] !== sorted_arr[i] && sorted_arr[i - 1] !== sorted_arr[i]) {
              results.push(sorted_arr[i])
            }
          }
          return results
        }
        setMarca(findDuplicates(res.map(producto => producto.marca)))
      })
      .catch(err => console.log(err))
  }, [])

  const handleAvatarName = () => {
    const userJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    const name = userJSON.name
    return name
  }

  const handleAvatarImage = () => {
    const userJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    const avatar = userJSON.avatar
    return avatar
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.replace('/login')
  }

  if (marca.length === 0) {
    return (
      <Flex justify='center'>
        <Spinner size='xl' thickness='4px' />
      </Flex>
    )
  } else {
    return (
      <Box className='navbar' w='100%' pos='fixed' zIndex='100'>
        <Container className='nav-paths'>
          <ul className='nav-links'>

            <Link to='/' className='home nav-button'>
              <li><Icon w={8} h={8}><AiFillHome /></Icon></li>
            </Link>
            <Center height='30px'>
              <Divider orientation='vertical' />
            </Center>

            <Link to='/productos' className='productos nav-button'>
              <li>Todos</li>
            </Link>
            <Center height='30px'>
              <Divider orientation='vertical' />
            </Center>

            {
            marca.map((marca, index) => {
              return (
                <LinkNav key={index} marca={marca} />
              )
            })
          }

          </ul>
        </Container>

        <Container className='nav-profile'>
          <ul className='nav-links'>

            <Link to='/carrito' className='carrito nav-button'>
              <li><Icon w={10} h={10}><FiShoppingCart /></Icon></li>
            </Link>

            <li>
              <Menu>
                <MenuButton>
                  {
                  userState
                    ? <Avatar name={handleAvatarName()} src={handleAvatarImage()} />
                    : <Avatar src='https://bit.ly/broken-link' />
                }
                </MenuButton>
                <MenuList>
                  <Link to='/login' className='profile-list' style={userState === true ? { display: 'none' } : { display: 'block' }}>
                    <MenuItem>Iniciar Sesion</MenuItem>
                  </Link>
                  <Link to='#' onClick={handleLogout} className='profile-list' style={userState === false ? { display: 'none' } : { display: 'block' }}>
                    <MenuItem>Cerrar Sesion</MenuItem>
                  </Link>
                  <Link to='/registrarse' className='profile-list'>
                    <MenuItem>Registrarse</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </li>

          </ul>
        </Container>

      </Box>
    )
  }
}
