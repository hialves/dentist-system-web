import React from 'react'
import { Flex } from '@chakra-ui/react'
import Header from './Header'
import { Footer } from './Footer'

interface Props {
  children: React.ReactNode
}

export const LandingLayout: React.FC<Props> = (props) => {
  return (
    <>
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: '1200px' }}
        m="0 auto"
        {...props}
      >
        <Header />
        {props.children}
      </Flex>
      <Footer />
    </>
  )
}
