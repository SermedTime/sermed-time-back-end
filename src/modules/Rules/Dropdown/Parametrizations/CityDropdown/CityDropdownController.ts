import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CityDropdownUseCase } from './CityDropdownUseCase'

class CityDropdownController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { state } = req.query

    const service = container.resolve(CityDropdownUseCase)

    const cities = await service.execute(state as string)

    return res.status(cities.status).json(cities)
  }
}

export { CityDropdownController }
