import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  // eslint-disable-next-line no-unused-vars
  useColorModeValue
} from '@chakra-ui/react'
import * as React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export const CartOrderSummary = ({ precio }) => {
  return (
    <Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' width='full'>
      <Heading size='md'>Resumen de orden</Heading>

      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontSize='lg' fontWeight='semibold'>
            Total
          </Text>
          <Text fontSize='xl' fontWeight='extrabold'>
            $ {precio}
          </Text>
        </Flex>
      </Stack>
      <Button colorScheme='facebook' size='lg' fontSize='md' rightIcon={<FaArrowRight />}>
        Pasar a pagar
      </Button>
    </Stack>
  )
}
