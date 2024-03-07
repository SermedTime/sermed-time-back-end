import axios, { AxiosError } from 'axios'
import https from 'https'

export interface ApiAuthResponse {
  status: number
  data?: {
    session: string
  }
  error?: boolean
  message?: any
}

interface IParams {
  baseURL: string
}

export async function auth({ baseURL }: IParams): Promise<ApiAuthResponse> {
  try {
    const api = axios.create({
      baseURL: `https://${baseURL}`,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })

    const params = {
      login: 'admin',
      password: 'admin'
    }

    const response = await api.post('/login.fcgi', params)

    return response
  } catch (error) {
    const err = error as AxiosError

    return {
      status: err.response?.status ?? 0,
      error: true,
      message: ''
    }
  }
}
