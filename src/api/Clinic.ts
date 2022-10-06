import { apiRoutes } from '../config/api.routes'
import { api } from '../services/api'

export interface IClinic {
  id: number
  name: string
  document: string
  phone?: string
  address?: string
  icon?: string
  deletedAt: string
  createdAt: Date
  updatedAt: Date
}

const prefix = apiRoutes.clinic

export const ClinicApi = {
  create: async (payload: {
    name: string | undefined
    document: string | undefined
    phone?: string
    address?: string
  }) => {
    return api.post(`${prefix}`, payload)
  },
  findAll: async (): Promise<IClinic[]> => {
    return api.get(`${prefix}`)
  },
  delete: async (id: number) => {
    return api.delete(`${prefix}/${id}`)
  },
  getEmployeeClinics: async (employeeId: number): Promise<IClinic[]> => {
    return api.get(`${prefix}/employee/clinics/${employeeId}`)
  },
}
