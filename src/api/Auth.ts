import { api } from '../services/api'
import { payloadToFormData } from './utils'

export interface SignInPayload {
  email: string
  password: string
  tenant: string | undefined
}

export interface SignUpPayload {
  name: string
  email: string
  password: string
}

export const AuthApi = {
  signIn: async (payload: SignInPayload): Promise<{ accessToken: string }> => {
    return api.post(
      '/auth/employee/login/:schemaExternalRef'.replace(
        ':schemaExternalRef',
        String(payload.tenant)
      ),
      payload
    )
  },
  signUp: async (payload: SignUpPayload) => {
    const finalPayload = payloadToFormData(payload)

    return api.post('/auth/employee/register', finalPayload)
  },
  finalizeLogin: async (clinicId: number): Promise<{ accessToken: string }> => {
    return api.post('/auth/employee/finalize-login', { clinicId })
  },
}
