import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ResetPasswordUseCase } from './ResetPasswordUseCase'

class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.params
    const { password } = req.body

    const resetePasswordUseCase = container.resolve(ResetPasswordUseCase)

    const response = await resetePasswordUseCase.execute({
      token,
      password
    })

    return res
      .status(response.status)
      .json({ status: response.status, message: response.message })
  }
}

export { ResetPasswordController }
