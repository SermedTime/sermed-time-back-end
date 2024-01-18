import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RecoverPasswordUseCase } from './RecoverPasswordUseCase'

class RecoverPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    const recoverPassworduseCase = container.resolve(RecoverPasswordUseCase)

    await recoverPassworduseCase.execute(email)

    return res.json({ email })
  }
}

export { RecoverPasswordController }
