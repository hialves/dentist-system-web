import React from 'react'
import { Box, Flex, keyframes, Tooltip } from '@chakra-ui/react'

interface Props {
  isActive?: boolean
}

export const StatusIndicator: React.FC<Props> = ({ isActive = false }) => {
  const activeColor = 'green.500'
  const occupiedColor = 'red.400'
  const ringScaleMin = 0.33
  const ringScaleMax = 0.66

  const pulseRing = keyframes`
	0% {
    transform: scale(${ringScaleMin});
  }
	30% {
		transform: scale(${ringScaleMax});
	},
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`

  const pulseDot = keyframes`
	0% {
    transform: scale(0.9);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.9);
  }
	`

  return (
    <>
      {isActive ? (
        <Tooltip label={`Disponível`} textTransform="capitalize">
          <Box
            as="div"
            h="24px"
            w="24px"
            position="relative"
            bgColor={activeColor}
            borderRadius="50%"
          />
        </Tooltip>
      ) : (
        <Tooltip label={`Ocupado`} textTransform="capitalize">
          <Box
            as="div"
            h="24px"
            w="24px"
            position="relative"
            bgColor={occupiedColor}
            borderRadius="50%"
          />
        </Tooltip>
      )}
    </>
  )
}
