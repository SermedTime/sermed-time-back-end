import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DetailsUnitUseCase } from './DetailsUnitUseCase'

class DetailsUnitController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const service = container.resolve(DetailsUnitUseCase)

    const unit = await service.execute(uuid)

    return res.status(unit.status).json(unit)
  }
}

export { DetailsUnitController }
