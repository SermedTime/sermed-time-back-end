export interface IResponseRepository<T = any> {
  success: boolean
  data?: T[]
  message?: string
}
