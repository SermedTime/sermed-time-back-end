import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTimeClockUseCase } from './CreateTimeClockUseCase'

class CreateTimeClockController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      city,
      clock_ip,
      manufacturer,
      model,
      name,
      sector,
      state,
      status,
      unit
    } = req.body

    const createTimeClockUseCase = container.resolve(CreateTimeClockUseCase)

    const timeClock = await createTimeClockUseCase.execute({
      city,
      clock_ip,
      manufacturer,
      model,
      name,
      sector,
      state,
      status,
      unit
    })

    return res.status(201).json(timeClock)
  }
}

export { CreateTimeClockController }
