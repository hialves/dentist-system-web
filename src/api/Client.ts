import { apiRoutes } from '../config/api.routes'
import { api } from '../services/api'

export interface IClient {
  id: number
  name: string
  email: string
  document?: string
  photo?: string
  phone?: string
  createdAt: Date
  updatedAt: Date
}

const prefix = apiRoutes.client

export const ClientApi = {
  create: async () => {
    // return api.post(`${prefix}`)
  },
  findAll: async (): Promise<IClient[]> => {
    return api.get(`${prefix}`)
  },
  delete: async (id: number) => {
    return api.delete(`${prefix}/${id}`)
  },
}
