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
import { ChangeState } from '../../../../common/app.types'
import { showToast } from '../../../../utils/toast'
import { restrict } from '../../../../router/routes'
import { ClinicApi, IClinic } from '../../../../api/Clinic'
import { ActionButtons } from '../../../../components/ActionButtons'
import { ListingLayout } from '../../../../components/ListingLayout'
import { ListingLoading } from '../../../../components/ListingLoading'

export const Clinics: React.FC = () => {
  const config = {
    title: 'Clínicas vinculadas',
    addText: 'Adicionar nova clínica',
    goToAddRoute: restrict.clinicAdd,
  }
  const toast = useToast()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IClinic[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const response = await ClinicApi.findAll().finally(() => setLoading(false))

    setData(response)
  }

  function goToAdd() {
    navigate(config.goToAddRoute)
  }

  async function handleDelete(
    id: number,
    setLoadingDelete: ChangeState<boolean>
  ) {
    setLoadingDelete(true)

    await ClinicApi.delete(id).catch((e: any) => {
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
                      <ActionButtons
                        id={item.id}
                        handleDelete={handleDelete}
                        isSoftDelete
                      />
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
