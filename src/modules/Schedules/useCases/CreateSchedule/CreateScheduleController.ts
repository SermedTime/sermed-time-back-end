import { Request, Response } from 'express'

import { container } from 'tsyringe'

import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'

import { CreateScheduleUseCase } from './CreateScheduleUseCase'

class CreateScheduleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, team_id, shift_id, schedule_date } = req.body

    const user_action = userAuthenticated(req)

    const service = container.resolve(CreateScheduleUseCase)

    const schedule = await service.execute({
      user_id,
      team_id,
      shift_id,
      schedule_date,
      user_action
    })

    return res.status(schedule.status).json(schedule)
  }
}

export { CreateScheduleController }
