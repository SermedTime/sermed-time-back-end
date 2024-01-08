import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DetailsTimeClockUseCase } from './DetailsTimeClockUseCase'

class DetailsTimeClockController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const detailsTimeClockUseCase = container.resolve(DetailsTimeClockUseCase)

    const timeClock = await detailsTimeClockUseCase.execute(uuid)

    return res.status(200).json(timeClock)
  }
}

export { DetailsTimeClockController }
