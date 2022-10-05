import { Button, Container, Flex, Input, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TitleWindow from '../../../../components/TitleWindow'
import { restrict } from '../../../../router/routes'
import { showToast } from '../../../../utils/toast'
import { ClientApi } from '../../../../api/Client'

export const AddClient: React.FC = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const documentRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  async function handleConfirm() {
    setLoading(true)
    const payload: {
      name: string | undefined
      email: string | undefined
      document?: string
      phone?: string
    } = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      document: documentRef.current?.value,
      phone: phoneRef.current?.value,
    }

    try {
      await ClientApi.create(payload)
      navigate(restrict.client)
    } catch (e: any) {
      setLoading(false)
      showToast(toast, e.message, 'error')
    }
  }

  return (
    <Container maxW={'5x1'} paddingBottom={12} paddingTop={12}>
      <TitleWindow title="Registrar novo cliente" />
      <Container>
        <Flex
          flexDirection={'column'}
          bg="white"
          h={['80%', '75%', '75%', '70%']}
          w={['80%', '70%', '50%', '80%']}
          minH={[550, 490, 490, 300]}
          borderRadius={'3xl'}
          paddingY={10}
          paddingX={5}
          boxShadow={'3px 3px 3px 3px rgba(0,0,0,.3)'}
        >
          <Input
            ref={nameRef}
            type="text"
            name="name"
            fontSize={20}
            h={50}
            mt={5}
            mb={5}
            autoFocus
            focusBorderColor="black"
            bgColor={'rgba(232,240,254,.6)'}
            placeholder="Nome do cliente"
            errorBorderColor="red.300"
          />

          <Input
            ref={emailRef}
            type="text"
            name="email"
            fontSize={20}
            h={50}
            mt={5}
            mb={5}
            autoFocus
            focusBorderColor="black"
            bgColor={'rgba(232,240,254,.6)'}
            placeholder="Email"
            errorBorderColor="red.300"
          />

          <Input
            ref={documentRef}
            type="text"
            name="document"
            fontSize={20}
            maxLength={15}
            h={50}
            mt={5}
            mb={5}
            autoFocus
            focusBorderColor="black"
            bgColor={'rgba(232,240,254,.6)'}
            placeholder="CPF"
            errorBorderColor="red.300"
          />

          <Input
            ref={phoneRef}
            type="text"
            name="phone"
            fontSize={20}
            h={50}
            mt={5}
            mb={5}
            autoFocus
            focusBorderColor="black"
            bgColor={'rgba(232,240,254,.6)'}
            placeholder="Telefone com DDD"
            errorBorderColor="red.300"
          />

          <Button
            onClick={handleConfirm}
            isLoading={loading}
            fontSize={18}
            h={35}
            mt={30}
            bg="purple.500"
            _hover={{
              bg: 'purple.300',
            }}
            color="white"
          >
            Cadastrar
          </Button>
        </Flex>
      </Container>
    </Container>
  )
}
