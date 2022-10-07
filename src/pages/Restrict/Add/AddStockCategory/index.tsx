import { Button, Container, Flex, Input, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StockCategoryApi } from '../../../../api/Stock-Category'
import TitleWindow from '../../../../components/TitleWindow'
import { restrict } from '../../../../router/routes'
import { showToast } from '../../../../utils/toast'

export const AddStockCategory: React.FC = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  async function handleConfirm() {
    setLoading(true)
    const payload: {
      name: string | undefined
    } = {
      name: nameRef.current?.value,
    }

    try {
      await StockCategoryApi.create(payload)
      navigate(restrict.stockCategory)
    } catch (e: any) {
      setLoading(false)
      showToast(toast, e.message, 'error')
    }
  }

  return (
    <Container maxW={'5x1'} paddingBottom={12} paddingTop={12}>
      <TitleWindow title="Adicionar nova categoria de estoque" />
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
            placeholder="Nome do item"
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
