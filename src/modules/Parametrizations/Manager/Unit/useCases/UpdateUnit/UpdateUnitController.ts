import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { UpdateUnitUseCase } from './UpdateUnitUseCase'

class UpdateUnitController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const userId = userAuthenticated(req)

    const { unitName, status } = req.body

    const service = container.resolve(UpdateUnitUseCase)

    const unit = await service.execute({
      uuid,
      unitName,
      status,
      user_action: userId
    })

    return res.status(unit.status).json(unit)
  }
}

export { UpdateUnitController }
