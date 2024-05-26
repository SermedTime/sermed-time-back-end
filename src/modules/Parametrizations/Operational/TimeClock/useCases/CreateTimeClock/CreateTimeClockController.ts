import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { CreateTimeClockUseCase } from './CreateTimeClockUseCase'

class CreateTimeClockController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { clock_ip, manufacturer, model, name, sector, status, unit } =
      req.body

    const userId = userAuthenticated(req)

    const createTimeClockUseCase = container.resolve(CreateTimeClockUseCase)

    const timeClock = await createTimeClockUseCase.execute({
      clock_ip,
      manufacturer,
      model,
      name,
      sector,
      status,
      unit,
      user_action: userId
    })

    return res.status(timeClock.status).json(timeClock)
  }
}

export { CreateTimeClockController }
