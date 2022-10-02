import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../../../Logo'
import {
  RiMenu5Fill as MenuIcon,
  RiCloseFill as CloseIcon,
} from 'react-icons/ri'
import { useAuth } from '../../../contexts/auth'
import { open } from '../../../router/routes'

interface PropsMenuItems {
  children: React.ReactNode
  isLast?: boolean
  to: string
}

const MenuItems: React.FC<PropsMenuItems> = (props) => {
  const { children, isLast, to = '/', ...rest } = props
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </Text>
  )
}

const Header: React.FC = (props) => {
  const { signed } = useAuth()
  const [show, setShow] = React.useState(false)
  const toggleMenu = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      color={['gray.700', 'gray.700', 'primary.700', 'primary.700']}
      {...props}
    >
      <Flex align="center">
        <Logo
          w="100px"
          color={['white', 'white', 'primary.500', 'primary.500']}
        />
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to="/">Início</MenuItems>
          <MenuItems to="/how">Como funciona </MenuItems>
          <MenuItems to="/features">Funcionalidades </MenuItems>
          <MenuItems to="/pricing">Preços </MenuItems>
          {!signed ? (
            <>
              <MenuItems to={open.signUpTenant} isLast>
                <Button
                  size="sm"
                  rounded="md"
                  color={['primary.500', 'primary.500', 'white', 'white']}
                  bg={[
                    'purple.500',
                    'purple.500',
                    'primary.500',
                    'primary.500',
                  ]}
                  _hover={{
                    bg: ['gray.100', 'gray.100', 'gray.600', 'gray.600'],
                  }}
                >
                  Criar conta
                </Button>
              </MenuItems>
            </>
          ) : (
            <MenuItems to="/app" isLast>
              <Button
                size="sm"
                rounded="md"
                color={['primary.500', 'primary.500', 'white', 'white']}
                bg={['purple.500', 'purple.500', 'primary.500', 'primary.500']}
                _hover={{
                  bg: ['gray.100', 'gray.100', 'gray.600', 'gray.600'],
                }}
              >
                Dashboard
              </Button>
            </MenuItems>
          )}
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
