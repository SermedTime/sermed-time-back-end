import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthUseCase } from './AuthUseCase'

class AuthController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authUseCase = container.resolve(AuthUseCase)

    const user = await authUseCase.execute({ email, password })

    return res.status(user.status).json(user)
  }
}

export { AuthController }
