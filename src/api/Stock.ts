import { apiRoutes } from '../config/api.routes'
import { api } from '../services/api'

export interface IStock {
  id: number

  name: string

  quantity: number

  stockCategoryId?: number

  createdAt: Date

  updatedAt: Date
}

const prefix = apiRoutes.stock

export const StockApi = {
  create: async (payload: {
    name: string | undefined
    quantity: number | undefined
    stockCategoryId?: number | undefined
  }) => {
    return api.post(`${prefix}`, payload)
  },
  findAll: async (): Promise<IStock[]> => {
    return api.get(`${prefix}`)
  },
  delete: async (id: number) => {
    return api.delete(`${prefix}/${id}`)
  },
}
