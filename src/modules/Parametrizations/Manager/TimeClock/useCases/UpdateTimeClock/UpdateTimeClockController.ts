import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'
import { UpdateTimeClockUseCase } from './UpdateTimeClockUseCase'

class UpdateTimeClockController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params
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

    const userId = userAuthenticated(req)

    const updateTimeClockUseCase = container.resolve(UpdateTimeClockUseCase)

    const timeClock = await updateTimeClockUseCase.execute({
      uuid,
      city,
      clock_ip,
      manufacturer,
      model,
      name,
      sector,
      state,
      status,
      unit,
      user_action: userId
    })

    return res.status(timeClock.status).json(timeClock)
  }
}

export { UpdateTimeClockController }
