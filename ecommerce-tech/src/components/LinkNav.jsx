import { Center, Divider } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const LinkNav = ({ marca }) => {
  return (
    <>
      <Link to={`/productos/marca/${marca.toLowerCase()}`} className='nav-button'>
        <li>{marca[0].toUpperCase() + marca.substring(1)}</li>
      </Link>
      <Center height='30px'>
        <Divider orientation='vertical' />
      </Center>
    </>
  )
}
