import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { FiFile } from 'react-icons/fi'
import { ChangeState, HtmlEvent } from '../../../../../common/app.types'

interface Props {
  companyName: string
  document: string
  address: string
  phone: string
  logo?: File
  setCompanyName: ChangeState
  setDocument: ChangeState
  setAddress: ChangeState
  setPhone: ChangeState
  setLogo?: ChangeState<File | undefined>
}

const CompanyStep: React.FC<Props> = ({
  companyName,
  setCompanyName,
  document,
  setDocument,
  phone,
  logo,
  setPhone,
  address,
  setAddress,
  setLogo,
}) => {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiFile} />
        </InputLeftElement>
        <input
          type="file"
          ref={fileRef}
          onChange={(e: HtmlEvent) =>
            e.target.files?.[0] && setLogo && setLogo(e.target.files[0])
          }
          accept={'image/jpg'}
          style={{ display: 'none' }}
        />
        <Input
          placeholder={'Seu logo'}
          onClick={() => fileRef.current?.click()}
          readOnly={true}
          value={(logo && logo.name) || ''}
        />
      </InputGroup>

      <Text fontSize={20} color={'#808285'}>
        Nome da clínica
      </Text>
      <Input
        value={companyName}
        onChange={(e: HtmlEvent) => setCompanyName(e.target.value)}
        fontSize={18}
        h={50}
        autoFocus
        focusBorderColor="black"
        bgColor={'rgba(232,240,254,.6)'}
        placeholder="Digite o nome da clínica"
        errorBorderColor="red.300"
      />
      <Text fontSize={20} color={'#808285'}>
        CNPJ
      </Text>
      <Input
        value={document}
        onChange={(e: HtmlEvent) => setDocument(e.target.value)}
        fontSize={18}
        h={50}
        focusBorderColor="black"
        bgColor={'rgba(232,240,254,.6)'}
        type={'text'}
        placeholder="Digite o CNPJ"
        errorBorderColor="red.300"
      />
      <Text fontSize={20} color={'#808285'}>
        Endereço
      </Text>
      <Input
        value={address}
        onChange={(e: HtmlEvent) => setAddress(e.target.value)}
        fontSize={18}
        h={50}
        focusBorderColor="black"
        bgColor={'rgba(232,240,254,.6)'}
        type={'text'}
        placeholder="Informe o endereço da clínica"
        errorBorderColor="red.300"
      />
      <Text fontSize={20} color={'#808285'}>
        Número de contato empresarial
      </Text>
      <Input
        value={phone}
        onChange={(e: HtmlEvent) => setPhone(e.target.value)}
        fontSize={18}
        h={50}
        focusBorderColor="black"
        bgColor={'rgba(232,240,254,.6)'}
        type={'text'}
        placeholder="Digite um telefone ou celular"
        errorBorderColor="red.300"
      />
    </>
  )
}

export default CompanyStep
