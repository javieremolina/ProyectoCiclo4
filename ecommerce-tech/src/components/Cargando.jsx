import { Flex, Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Cargando = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
  }, [])

  return (
    <Flex justify='center'>
      <Spinner size='xl' thickness='4px' />
    </Flex>
  )
}
