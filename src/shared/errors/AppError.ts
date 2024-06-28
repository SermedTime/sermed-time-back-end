export class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode || 500

    Error.captureStackTrace(this, this.constructor)
  }
}
