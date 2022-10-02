import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ChangeState } from '../../common/app.types'
import { showToast } from '../../utils/toast'
import { IStock, StockApi } from '../../api/Stock'
import { restrict } from '../../router/routes'
import { ActionButtons } from '../../components/ActionButtons'
import { ListingLayout } from '../../components/ListingLayout'
import { ListingLoading } from '../../components/ListingLoading'

const Stocks: React.FC = () => {
  const config = {
    title: 'Estoque de materiais',
    addText: 'Adicionar ao estoque',
    goToAddRoute: restrict.stockAdd,
  }
  const toast = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IStock[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const response = await StockApi.findAll().finally(() => setLoading(false))

    setData(response)
  }

  function goToAdd() {
    navigate(restrict.stockAdd)
  }

  async function handleDelete(
    id: number,
    setLoadingDelete: ChangeState<boolean>
  ) {
    setLoadingDelete(true)

    await StockApi.delete(id).catch((e: any) => {
      setLoadingDelete(false)
      showToast(toast, e.message, 'error')
    })

    setLoadingDelete(false)

    setData((prevData) => prevData.filter((p) => p.id !== id))
  }

  return (
    <ListingLayout
      title={config.title}
      addText={config.addText}
      goToAdd={goToAdd}
    >
      <TableContainer>
        <ListingLoading loading={loading} />
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Categoria</Th>
              <Th>Criado em</Th>
              <Th>Atualizado em</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          {!loading && (
            <Tbody>
              {data.map((item) => {
                const createdAt = new Date(item.createdAt)
                const updatedAt = new Date(item.createdAt)
                return (
                  <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>
                      {createdAt.toLocaleDateString()}{' '}
                      {createdAt.toLocaleTimeString()}
                    </Td>
                    <Td>
                      {updatedAt.toLocaleDateString()}{' '}
                      {updatedAt.toLocaleTimeString()}
                    </Td>
                    <Td>
                      <ActionButtons id={item.id} handleDelete={handleDelete} />
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </ListingLayout>
  )
}

export default Stocks
