import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'

import { CreateUnitUseCase } from './CreateUnitUseCase'

class CreateUnitController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { unitName, status } = req.body

    const userId = userAuthenticated(req)

    const service = container.resolve(CreateUnitUseCase)

    const unit = await service.execute({
      unitName,
      status,
      user_action: userId
    })

    return res.status(unit.status).json(unit)
  }
}

export { CreateUnitController }
