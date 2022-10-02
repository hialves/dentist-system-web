import React from 'react'
import { Button, Flex, Show, IconButton, Tooltip } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'

interface Props {
  goToAdd: () => void
  addText?: string
}

export const CreateEntityButton: React.FC<Props> = ({
  addText = '',
  goToAdd,
}) => {
  return (
    <>
      <Flex alignSelf={'flex-end'}>
        <Show above="sm">
          <Button
            onClick={goToAdd}
            leftIcon={<PlusSquareIcon />}
            border={'1px solid gray'}
          >
            {addText}
          </Button>
        </Show>
        <Show below="sm">
          <Tooltip label={addText} textTransform="capitalize">
            <IconButton
              aria-label="adicionar"
              icon={<PlusSquareIcon />}
              border={'1px solid gray'}
              onClick={goToAdd}
            />
          </Tooltip>
        </Show>
      </Flex>
    </>
  )
}
