import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShiftDropdownUseCase } from './ShiftDropdownUseCase'

class ShiftDropdownController {
  async handle(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ShiftDropdownUseCase)

    const companies = await service.execute()

    return res.status(companies.status).json(companies)
  }
}

export { ShiftDropdownController }
