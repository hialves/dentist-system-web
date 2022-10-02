import React, { useState } from 'react'
import { IconButton, Tooltip, Flex, CircularProgress } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { FiClipboard, FiPower } from 'react-icons/fi'
import { ChangeState } from '../../common/app.types'

interface Props {
  id: number
  handleDelete: (
    id: number,
    setLoadingDelete: ChangeState<boolean>
  ) => Promise<void>
  isSoftDelete?: boolean
  textDelete?: string
}

export const ActionButtons: React.FC<Props> = ({
  id,
  handleDelete,
  isSoftDelete = false,
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false)

  return (
    <Flex align={'center'}>
      <Tooltip label={`Ver detalhes`} textTransform="capitalize">
        <IconButton
          colorScheme="gray"
          aria-label="Ver detalhes"
          icon={<FiClipboard color="black" />}
          mr={2}
        />
      </Tooltip>
      <Tooltip
        label={isSoftDelete ? 'Desativar' : 'Excluir'}
        textTransform="capitalize"
      >
        <IconButton
          colorScheme="gray"
          aria-label={isSoftDelete ? 'Desativar' : 'Excluir'}
          icon={
            loadingDelete ? (
              <CircularProgress isIndeterminate color="green.300" />
            ) : isSoftDelete ? (
              <FiPower color="black" />
            ) : (
              <DeleteIcon color="black" />
            )
          }
          onClick={() => handleDelete(id, setLoadingDelete)}
        />
      </Tooltip>
    </Flex>
  )
}
