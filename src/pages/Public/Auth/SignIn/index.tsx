import {
  Button,
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { HtmlEvent } from '../../../../common/app.types'
import { useNavigate, useParams } from 'react-router-dom'
import AuthLayout from '../../../../components/AuthLayout'
import { useAuth } from '../../../../contexts/auth'
import { showToast } from '../../../../utils/toast'
import { open } from '../../../../router/routes'

export const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { signed, signIn, goToSignedPage } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { tenant } = useParams()

  useEffect(() => {
    if (signed) goToSignedPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signed])

  async function handleLogin() {
    if (loading) return

    setLoading(true)
    try {
      await signIn({ email, password, tenant })
    } catch (e: any) {
      setLoading(false)
      showToast(toast, e.message, 'error')
    }
  }

  return (
    <AuthLayout heading={'Entrar'} currentPage={'sign-in'}>
      <InputGroup>
        <InputLeftElement>
          <EmailIcon marginTop={3} />
        </InputLeftElement>
        <Input
          value={email}
          name="email"
          type="email"
          onChange={(e: HtmlEvent) => setEmail(e.target.value)}
          fontSize={20}
          h={50}
          autoFocus
          focusBorderColor="black"
          bgColor={'rgba(232,240,254,.6)'}
          placeholder="Email"
          errorBorderColor="red.300"
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement>
          <LockIcon marginTop={3} />
        </InputLeftElement>
        <Input
          value={password}
          name="password"
          onChange={(e: HtmlEvent) => setPassword(e.target.value)}
          bgColor={'rgba(232,240,254,.6)'}
          focusBorderColor="black"
          fontSize={20}
          h={50}
          type={showPassword ? 'text' : 'password'}
          placeholder="Digite sua senha"
          errorBorderColor="red.300"
        />
        <InputRightElement>
          <IconButton
            _focus={{}}
            variant="unstyled"
            aria-label="Show/Unshow pwd"
            onClick={() => setShowPassword((prevState) => !prevState)}
            icon={showPassword ? <ViewOffIcon mt={1} /> : <ViewIcon mt={1} />}
          />
        </InputRightElement>
      </InputGroup>

      <Divider />

      <Button
        onClick={handleLogin}
        isLoading={loading}
        fontSize={20}
        h={50}
        bg="purple.700"
        borderRadius={'40px'}
        _hover={{
          bg: 'purple.500',
        }}
        color="white"
        _focus={{
          boxShadow: '0 0 1px 2px rgba(128, 128, 128, .75)',
        }}
      >
        Entrar
      </Button>
      <Button
        onClick={() => {
          navigate(open.signUpTenant)
        }}
        fontSize={20}
        h={50}
        bg="gray.900"
        borderRadius={'40px'}
        _hover={{
          bg: 'gray.700',
        }}
        color="white"
      >
        Cadastre-se
      </Button>
    </AuthLayout>
  )
}
