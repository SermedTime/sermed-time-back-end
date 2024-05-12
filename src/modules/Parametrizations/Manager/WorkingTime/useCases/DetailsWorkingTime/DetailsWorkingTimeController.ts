import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DetailsWorkingTimeUseCase } from './DetailsWorkingTimeUseCase'

class DetailsWorkingTimeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const service = container.resolve(DetailsWorkingTimeUseCase)

    const workingTime = await service.execute(uuid)

    return res.status(workingTime.status).json(workingTime)
  }
}

export { DetailsWorkingTimeController }
