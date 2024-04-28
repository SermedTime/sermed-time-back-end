import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DetailsWorkingDayUseCase } from './DetailsWorkingDayUseCase'

class DetailsWorkingDayController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const service = container.resolve(DetailsWorkingDayUseCase)

    const workingDay = await service.execute(uuid)

    return res.status(workingDay.status).json(workingDay)
  }
}

export { DetailsWorkingDayController }
