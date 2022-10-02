import { apiRoutes } from '../config/api.routes'
import { api } from '../services/api'
import { payloadToFormData } from './utils'

export interface CreateTenantPayload {
  clinic: {
    name: string
    document: string
    address?: string
    phone?: string
    logo?: File
  }
  employee: {
    name: string
    document: string
    email: string
    password: string
  }
}

export interface CreateTenantResponse {
  name: string
  schemaName: string
  schemaExternalRef: string
}

const prefix = apiRoutes.tenant

export const TenantApi = {
  createTenant: async (
    payload: CreateTenantPayload
  ): Promise<CreateTenantResponse> => {
    const finalPayload = payload.clinic.logo
      ? payloadToFormData(payload)
      : payload

    return api.post(`${prefix}`, finalPayload)
  },
}
