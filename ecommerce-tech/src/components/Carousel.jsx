import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import Slider from 'react-slick'
import { useState } from 'react'

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1
}

export const Carousel = ({ imagenes }) => {
  const [slider, setSlider] = useState(null)
  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '10px' })
  return (
    <Box
      position='relative'
      height='auto'
      width='full'
      overflow='hidden'
    >
      <link
        rel='stylesheet'
        type='text/css'
        charSet='UTF-8'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
      />
      <link
        rel='stylesheet'
        type='text/css'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
      />
      <IconButton
        aria-label='left-arrow'
        colorScheme='messenger'
        borderRadius='full'
        position='absolute'
        left={side}
        top={top}
        transform='translate(0%, -50%)'
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      <IconButton
        aria-label='right-arrow'
        colorScheme='messenger'
        borderRadius='full'
        position='absolute'
        right={side}
        top={top}
        transform='translate(0%, -50%)'
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {imagenes.map((url, index) => (
          <Box
            key={index}
            height='300px'
            position='relative'
            backgroundPosition='center'
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            backgroundImage={`url(${url})`}
          />
        ))}
      </Slider>
    </Box>
  )
}
