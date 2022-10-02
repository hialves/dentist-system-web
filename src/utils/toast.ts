import { AlertStatus, useToast } from '@chakra-ui/react'

export function showToast(
  toastInstance: typeof useToast.prototype,
  messages: string[] | string,
  status: AlertStatus = 'info'
) {
  const title = getToastTitle(status)
  if (typeof messages === 'string') {
    toastInstance({
      title,
      description: messages,
      status,
      duration: 5000,
      isClosable: true,
    })
    return
  }

  messages.forEach((m: string, index: number) => {
    toastInstance({
      title,
      description: m,
      status,
      duration: 5000 + index * 100,
      isClosable: true,
    })
  })
}

function getToastTitle(status: AlertStatus) {
  return {
    info: 'Informação',
    warning: 'Aviso',
    success: 'Sucesso',
    error: 'Erro',
    loading: 'Carregando',
  }[status]
}
