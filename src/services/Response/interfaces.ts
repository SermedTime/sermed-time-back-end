export interface IResponseRepository<T> {
  success: boolean
  data?: T[] | T | string
  message?: string
}
