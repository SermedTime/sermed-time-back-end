export interface IResponseRepository<T> {
  success: boolean
  data?: T[]
  message?: string
}
