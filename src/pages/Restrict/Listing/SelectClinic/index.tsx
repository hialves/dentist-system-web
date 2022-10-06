import { Box, Flex, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ClinicApi, IClinic } from '../../../../api/Clinic'
import { ListingLayout } from '../../../../components/ListingLayout'
import { useAuth } from '../../../../contexts/auth'
import './index.css'

export const SelectClinic: React.FC = () => {
  const { profile, finalizeLogin } = useAuth()
  const [clinics, setClinics] = useState<IClinic[]>([])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  async function fetchData() {
    if (profile?.id) {
      const clinics = await ClinicApi.getEmployeeClinics(profile.id)
      setClinics(clinics)
    }
  }

  return (
    <ListingLayout title={'Selecione uma clínica'}>
      <Flex flex={1} pt={12} pb={12}>
        {clinics.map((clinic) => (
          <Box
            key={clinic.id}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            className="clinic-card"
            onClick={() => finalizeLogin(clinic.id)}
          >
            <Image src={clinic.icon} />

            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                  {clinic.name} &bull; {clinic.phone && `- ${clinic.phone}`}
                </Box>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                noOfLines={1}
              >
                Endereço: {clinic.address}
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
    </ListingLayout>
  )
}
