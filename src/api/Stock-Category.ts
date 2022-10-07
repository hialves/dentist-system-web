import { apiRoutes } from '../config/api.routes'
import { api } from '../services/api'

export interface IStockCategory {
  id: number

  name: string

  createdAt: Date

  updatedAt: Date
}

const prefix = apiRoutes.stockCategory

export const StockCategoryApi = {
  create: async () => {
    // return api.post(`${prefix}`, { names })
  },
  findAll: async (): Promise<IStockCategory[]> => {
    return api.get(`${prefix}`)
  },
  delete: async (id: number) => {
    return api.delete(`${prefix}/${id}`)
  },
}
