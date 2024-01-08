export interface IResponse<T> {
  data?: {
    data: T[] | T | string
    page?: number
    total?: number
  }
  status: number
  message?: string
  error?: string
}

interface IResponseProps<P> {
  data?: P[] | P | string
  page?: number
  total?: number
  success: boolean
  status: number
  message?: string
  error?: string
}

export class ResponseService {
  public static setResponseJson<T>({
    data = [],
    page = 0,
    total = 0,
    status,
    success,
    message = ''
  }: IResponseProps<any>): IResponse<T> {
    if (!success) {
      return {
        status,
        message
      }
    }

    return {
      data: {
        data,
        page,
        total
      },
      status
    }
  }
}
