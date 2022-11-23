import { Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'

export const PriceTag = (props) => {
  const { price } = props
  return (
    <Text
      as='span'
      fontWeight='medium'
      color={mode('gray.700', 'gray.400')}
    >
      ${price}
    </Text>
  )
}
