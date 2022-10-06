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
  createInternal: async (payload: {
    name: string | undefined
    document: string | undefined
    email: string | undefined
    cro?: string
  }) => {
    return api.post(`${prefix}`, payload)
  },
  findAll: async (): Promise<IEmployee[]> => {
    return api.get(`${prefix}`)
  },
  findOne: async (employeeId: number) => {
    return api.get(`${prefix}/${employeeId}`)
  },
  delete: async (id: number) => {
    return api.delete(`${prefix}/${id}`)
  },
  getProfile: async (): Promise<IEmployee> => {
    return api.get(`${prefix}/profile`)
  },
}
