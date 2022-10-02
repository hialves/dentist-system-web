import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use(
  (config: any) => {
    if (localStorage.getItem('accessToken')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        'accessToken'
      )}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(
      error.response.data || {
        statusCode: 500,
        message: 'Serviço fora do ar ou erro desconhecido',
      }
    )
  }
)
