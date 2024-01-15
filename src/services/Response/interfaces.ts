export interface IResponseRepository<T = any> {
  success: boolean
  data?: T[]
  message?: string
}

export interface IDropdown {
  uuid: string
  description: string
}
