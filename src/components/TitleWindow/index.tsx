import { Heading } from '@chakra-ui/react'
import React from 'react'

interface Props {
  title: string
}

const TitleWindow: React.FC<Props> = ({ title }) => {
  return (
    <Heading size="sm" as="h3">
      {title}
    </Heading>
  )
}

export default TitleWindow
