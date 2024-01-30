import { Request, Response } from 'express'

import { container } from 'tsyringe'

import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'

import { UpdateScheduleUseCase } from './UpdateScheduleUseCase'

class UpdateScheduleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { shift_id } = req.body
    const { schedule_id } = req.params

    const user_action = userAuthenticated(req)

    const service = container.resolve(UpdateScheduleUseCase)

    const schedule = await service.execute({
      id: schedule_id,
      shift_id,
      user_action
    })

    return res.status(schedule.status).json(schedule)
  }
}

export { UpdateScheduleController }
