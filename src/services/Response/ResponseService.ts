export interface IResponse<T = any> {
  data?: T[] | T | string
  page?: number
  total?: number
  status: number
  message?: string
  error?: string
}

interface IResponseProps<P> {
  data?: P[] | P | string
  page?: number
  records?: number
  success: boolean
  status: number
  message?: string
  error?: string
  create?: boolean
}

export class ResponseService {
  public static setResponseJson<T = any>({
    data = [],
    page = 0,
    records = 0,
    status,
    success,
    message = '',
    create = false
  }: IResponseProps<any>): IResponse<T> {
    if (!success) {
      return {
        status,
        message
      }
    }

    if (create) {
      return {
        data,
        status
      }
    }

    return {
      data,
      page,
      total: records,
      status
    }
  }
}
