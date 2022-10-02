import React from 'react'
import { Progress } from '@chakra-ui/react'

interface Props {
  loading: boolean
}

export const ListingLoading: React.FC<Props> = ({ loading = false }) => {
  return loading ? (
    <Progress size="xs" isIndeterminate mt={3} mb={3} colorScheme={'teal'} />
  ) : (
    <div
      style={{
        height: 4,
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: 'white',
      }}
    ></div>
  )
}
