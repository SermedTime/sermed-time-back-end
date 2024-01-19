import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ResetPasswordUseCase } from './ResetPasswordUseCase'

class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.params
    const { password, confirmPassword } = req.body

    const resetePasswordUseCase = container.resolve(ResetPasswordUseCase)

    const response = await resetePasswordUseCase.execute({
      token,
      password,
      confirmPassword
    })

    return res.status(200).json(response)
  }
}

export { ResetPasswordController }
