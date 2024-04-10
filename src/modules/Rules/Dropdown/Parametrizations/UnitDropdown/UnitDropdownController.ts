import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UnitDropdownUseCase } from './UnitDropdownUseCase'

class UnitDropdownController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { all } = req.query

    const service = container.resolve(UnitDropdownUseCase)

    const units = await service.execute({
      all: all as string
    })

    return res.status(units.status).json(units)
  }
}

export { UnitDropdownController }
