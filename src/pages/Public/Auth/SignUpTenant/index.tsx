import { Button, Divider, Flex, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../../../components/AuthLayout'
import { open } from '../../../../router/routes'
import { useAuth } from '../../../../contexts/auth'
import { showToast } from '../../../../utils/toast'
import EmployeeStep from './EmployeeStep'
import CompanyStep from './CompanyStep'
import { CreateTenantPayload, TenantApi } from '../../../../api/Tenant'

export const SignUpTenant: React.FC = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { signed, goToSignedPage } = useAuth()
  const [currentStep, setCurrentStep] = useState<'clinic' | 'employee'>(
    'clinic'
  )
  const [loading, setLoading] = useState(false)

  // Company
  const [companyName, setCompanyName] = useState('Clinica 1')
  const [document, setDocument] = useState('6546546543213')
  const [address, setAddress] = useState('Teste')
  const [phone, setPhone] = useState('65465465465465')
  const [logo, setLogo] = useState<File | undefined>()

  // Owner
  const [ownerName, setOwnerName] = useState('Hiago')
  const [email, setEmail] = useState('hiagotnt1@gmail.com')
  const [employeeDocument, setEmployeeDocument] = useState('00000000001')
  const [password, setPassword] = useState('12345678')
  const [confirmPassword, setConfirmPassword] = useState('12345678')

  useEffect(() => {
    if (signed) goToSignedPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signed])

  async function handleSignUp() {
    if (loading) return
    setLoading(true)

    const payload = signUpPayload()

    try {
      const tenant = await TenantApi.createTenant(payload)
      showToast(
        toast,
        'Clínica/Usuário criado! Entre com o email e senha informados',
        'success'
      )
      navigate(open.signIn.replace(':tenant', tenant.schemaExternalRef))
    } catch (e: any) {
      setLoading(false)
      showToast(toast, e.message, 'error')
    }
  }

  function signUpPayload(): CreateTenantPayload {
    const payload: CreateTenantPayload = {
      clinic: {
        name: companyName,
        document,
        address,
        phone,
      },
      employee: {
        name: ownerName,
        document: employeeDocument,
        email,
        password,
      },
    }

    if (logo) payload.clinic.logo = logo

    return payload
  }

  function getCurrentStep() {
    if (currentStep === 'clinic') {
      return (
        <>
          <CompanyStep
            companyName={companyName}
            document={document}
            phone={phone}
            address={address}
            logo={logo}
            setDocument={setDocument}
            setPhone={setPhone}
            setAddress={setAddress}
            setCompanyName={setCompanyName}
            setLogo={setLogo}
          />
          <Divider />
          <Button
            onClick={() => setCurrentStep('employee')}
            fontSize={20}
            h={50}
            bg="purple.500"
            _hover={{
              bg: 'purple.300',
            }}
            color="white"
          >
            Próximo passo
          </Button>
        </>
      )
    } else if (currentStep === 'employee') {
      return (
        <>
          <EmployeeStep
            ownerName={ownerName}
            email={email}
            employeeDocument={employeeDocument}
            password={password}
            confirmPassword={confirmPassword}
            setOwnerName={setOwnerName}
            setEmail={setEmail}
            setEmployeeDocument={setEmployeeDocument}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
          <Divider />
          <Flex flexDirection="row" justifyContent="space-between">
            <Button
              onClick={() => setCurrentStep('clinic')}
              fontSize={18}
              h={50}
              bg="gray.500"
              _hover={{
                bg: 'gray.300',
              }}
              color="white"
            >
              Voltar
            </Button>
            <Button
              onClick={handleSignUp}
              isLoading={loading}
              fontSize={18}
              h={50}
              bg="purple.500"
              _hover={{
                bg: 'purple.300',
              }}
              color="white"
            >
              Cadastrar
            </Button>
          </Flex>
        </>
      )
    }

    return null
  }

  return (
    <AuthLayout
      heading={'Cadastro'}
      currentPage={'sign-up'}
      description={'Informe seus dados'}
      showCloseButton
    >
      {getCurrentStep()}
    </AuthLayout>
  )
}
