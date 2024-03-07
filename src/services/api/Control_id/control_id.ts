import axios from 'axios'
import https from 'https'

export type IPayload = Record<string, any>

export interface ApiResponse {
  status: number
  data?: any
  error?: boolean
  message?: any
}

interface IParams {
  baseURL: string
  path: string
  params?: Record<string, unknown>
  controller?: AbortController
  header?: Record<string, string>
}

export async function get({
  baseURL,
  path,
  params,
  controller
}: Omit<IParams, 'header'>): Promise<ApiResponse> {
  try {
    const api = axios.create({
      baseURL: `https://${baseURL}`,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })

    const response = await api.get(path, {
      params,
      headers: {},
      signal: controller?.signal
    })

    return response
  } catch (error: any) {
    return {
      status: error?.response?.status || 0,
      error: true,
      message: error?.response?.data.message || ''
    }
  }
}

export async function post({
  baseURL,
  path,
  params,
  header
}: Omit<IParams, 'controller'>): Promise<ApiResponse> {
  try {
    const api = axios.create({
      baseURL: `https://${baseURL}`,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })

    const response = await api.post(path, params, {
      headers: {
        ...header
      }
    })

    return response
  } catch (error: any) {
    console.log(error)
    return {
      status: error?.response?.status || 0,
      error: true,
      message: error?.response?.data.message || ''
    }
  }
}
