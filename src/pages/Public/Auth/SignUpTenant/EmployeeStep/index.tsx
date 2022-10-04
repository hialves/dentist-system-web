import { Input, Text } from '@chakra-ui/react'
import React from 'react'
import { ChangeState, HtmlEvent } from '../../../../../common/app.types'

interface Props {
  ownerName: string
  email: string
  employeeDocument: string
  password: string
  confirmPassword: string
  setOwnerName: ChangeState
  setEmail: ChangeState
  setPassword: ChangeState
  setConfirmPassword: ChangeState
  setEmployeeDocument: ChangeState
}

const EmployeeStep: React.FC<Props> = ({
  ownerName,
  setOwnerName,
  employeeDocument,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  setEmployeeDocument,
}) => {
  return (
    <>
      <Text fontSize={20} color={'#808285'}>
        Seu nome
      </Text>
      <Input
        value={ownerName}
        onChange={(e: HtmlEvent) => setOwnerName(e.target.value)}
        fontSize={18}
        h={50}
        autoFocus
        focusBorderColor="black"
        bgColor={'rgba(232,240,254,.6)'}
        placeholder="Digite o seu nome"
        errorBorderColor="red.300"
      />
      <Text fontSize={20} color={'#808285'}>
        Email
      </Text>
      <Input
        value={email}
        onChange={(e: HtmlEvent) => setEmail(e.target.value)}
        fontSize={18}
        h={50}
        focusBorderColor="black"
        bgColor={'rgba(232,240,254,.6)'}
        type={'text'}
        placeholder="Digite o email"
        errorBorderColor="red.300"
      />

      <Text fontSize={20} color={'#808285'}>
        CPF
      </Text>
      <Input
        value={employeeDocument}
        onChange={(e: HtmlEvent) => setEmployeeDocument(e.target.value)}
        fontSize={18}
        h={50}
        focusBorderColor="black"
        bgColor={'rgba(232,240,254,.6)'}
        type={'text'}
        placeholder="CPF do colaborador"
        errorBorderColor="red.300"
      />

      <Text fontSize={20} color={'#808285'}>
        Senha
      </Text>
      <Input
        value={password}
        onChange={(e: HtmlEvent) => setPassword(e.target.value)}
        fontSize={18}
        h={50}
        focusBorderColor="black"
        bgColor={'rgba(232,240,254,.6)'}
        type={'text'}
        placeholder="Digite uma senha"
        errorBorderColor="red.300"
      />

      <Text fontSize={20} color={'#808285'}>
        Confirmar senha
      </Text>
      <Input
        value={confirmPassword}
        onChange={(e: HtmlEvent) => setConfirmPassword(e.target.value)}
        fontSize={18}
        h={50}
        focusBorderColor="black"
        bgColor={'rgba(232,240,254,.6)'}
        type={'text'}
        placeholder="Digite uma senha"
        errorBorderColor="red.300"
      />
    </>
  )
}

export default EmployeeStep
