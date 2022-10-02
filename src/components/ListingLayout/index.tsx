import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { CreateEntityButton } from '../CreateEntityButton'
import TitleWindow from '../TitleWindow'

interface Props {
  title: string
  addText: string
  goToAdd: () => void
  children: React.ReactNode
}

export const ListingLayout: React.FC<Props> = ({
  children,
  title,
  addText,
  goToAdd,
}) => {
  return (
    <Box>
      <Flex flex={1} justifyContent={'space-between'} alignItems={'center'}>
        <TitleWindow title={title} />

        <CreateEntityButton addText={addText} goToAdd={goToAdd} />
      </Flex>
      {children}
    </Box>
  )
}
