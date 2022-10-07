import {
  Button,
  Container,
  Flex,
  Input,
  useToast,
  Select,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StockApi } from '../../../../api/Stock'
import {
  IStockCategory,
  StockCategoryApi,
} from '../../../../api/Stock-Category'
import TitleWindow from '../../../../components/TitleWindow'
import { restrict } from '../../../../router/routes'
import { showToast } from '../../../../utils/toast'

export const AddStock: React.FC = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [stockCategories, setStockCategories] = useState<IStockCategory[]>([])
  const nameRef = useRef<HTMLInputElement>(null)
  const stockCategoryRef = useRef<HTMLSelectElement>(null)
  const quantityRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    const data = await StockCategoryApi.findAll()
    setStockCategories(data)
  }

  async function handleConfirm() {
    setLoading(true)
    const payload: {
      name: string | undefined
      quantity: number | undefined
      stockCategoryId?: number | undefined
    } = {
      name: nameRef.current?.value,
      quantity: quantityRef.current?.value ? +quantityRef.current?.value : 0,
      stockCategoryId: stockCategoryRef.current?.value
        ? +stockCategoryRef.current?.value
        : undefined,
    }

    try {
      await StockApi.create(payload)
      navigate(restrict.stock)
    } catch (e: any) {
      setLoading(false)
      showToast(toast, e.message, 'error')
    }
  }

  return (
    <Container maxW={'5x1'} paddingBottom={12} paddingTop={12}>
      <TitleWindow title="Adicionar novo item ao estoque" />
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

          <Input
            ref={quantityRef}
            type="text"
            name="quantity"
            fontSize={20}
            maxLength={18}
            h={50}
            mt={5}
            mb={5}
            autoFocus
            defaultValue={0}
            focusBorderColor="black"
            bgColor={'rgba(232,240,254,.6)'}
            placeholder="Quantidade atual (opcional)"
            errorBorderColor="red.300"
          />

          <Select placeholder="Selecione uma categoria" ref={stockCategoryRef}>
            {stockCategories.map(
              (stockCategory: IStockCategory, index: number) => (
                <option key={index} value={stockCategory.id}>
                  {stockCategory.name}
                </option>
              )
            )}
          </Select>

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
