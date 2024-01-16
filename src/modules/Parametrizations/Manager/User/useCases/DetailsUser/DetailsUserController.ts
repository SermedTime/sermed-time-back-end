import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DetailsUserUseCase } from './DetailsUserUseCase'

class DetailsUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const detailsUserUseCase = container.resolve(DetailsUserUseCase)

    const user = await detailsUserUseCase.execute(uuid)

    return res.status(user.status).json(user)
  }
}

export { DetailsUserController }
