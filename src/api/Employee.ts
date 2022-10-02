import { apiRoutes } from '../config/api.routes'
import { api } from '../services/api'

export interface IEmployee {
  id: number
  name: string
  email: string
  document: string
  cro?: string
  photo?: string
  deletedAt: string
  createdAt: Date
  updatedAt: Date
}

const prefix = apiRoutes.employee

export const EmployeeApi = {
  create: async () => {
    // return api.post(`${prefix}`)
  },
  findAll: async (): Promise<IEmployee[]> => {
    return api.get(`${prefix}`)
  },
  delete: async (id: number) => {
    return api.delete(`${prefix}/${id}`)
  },
}
