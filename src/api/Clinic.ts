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
  create: async () => {
    // return api.post(`${prefix}`)
  },
  findAll: async (): Promise<IClinic[]> => {
    return api.get(`${prefix}`)
  },
  delete: async (id: number) => {
    return api.delete(`${prefix}/${id}`)
  },
}
