import React from 'react'
import BackgroundImage from '../../assets/bg.jpg'
import { Box, Center, CloseButton, Flex, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { open } from '../../router/routes'

interface Props {
  children: React.ReactNode
  heading: string
  currentPage: 'sign-in' | 'sign-up'
  showCloseButton?: boolean
  description?: string
}

const AuthLayout: React.FC<Props> = ({
  children,
  heading,
  description,
  showCloseButton = false,
  currentPage,
}) => {
  const navigate = useNavigate()

  function getFlexProps() {
    if (currentPage === 'sign-in') {
      return {
        h: ['80%', '75%', '75%', '55%'],
        w: ['80%', '70%', '50%', '30%', '2x1'],
        minH: [550, 490, 490, 300],
      }
    } else if (currentPage === 'sign-up') {
      return {
        h: ['80%', '75%', '75%', '75%'],
        w: ['80%', '70%', '50%', '35%'],
        minH: [550, 490, 490, 490],
      }
    }
  }

  return (
    <Center
      backgroundImage={BackgroundImage}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
      h={'100vh'}
      minH={'100vh'}
    >
      <Flex
        flexDirection={'column'}
        justifyContent={'space-around'}
        bg="white"
        h={['80%', '75%', '75%', '55%']}
        w={['80%', '70%', '50%', '25%']}
        minH={[550, 490, 490, 300]}
        borderRadius={'3xl'}
        paddingY={10}
        paddingX={5}
        boxShadow={'0 3px 3px rgba(0,0,0,.3)'}
        {...getFlexProps()}
      >
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          <Heading color={'#0d0d0d'} fontWeight={'bold'}>
            {heading}
          </Heading>
          {showCloseButton && (
            <CloseButton
              alignSelf={'flex-end'}
              onClick={() => {
                navigate(open.index)
              }}
              size="lg"
            />
          )}
        </Box>
        {description && (
          <Text fontWeight={'medium'} fontSize={20} color={'#808285'}>
            {description}
          </Text>
        )}
        {children}
      </Flex>
    </Center>
  )
}

export default AuthLayout
