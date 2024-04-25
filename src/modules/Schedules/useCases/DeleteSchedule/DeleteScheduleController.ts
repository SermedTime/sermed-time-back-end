import { Request, Response } from 'express'

import { container } from 'tsyringe'

import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'

import { DeleteScheduleUseCase } from './DeleteScheduleUseCase'

class DeleteScheduleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { schedule_id } = req.params

    const user_action = userAuthenticated(req)

    const service = container.resolve(DeleteScheduleUseCase)

    const schedule = await service.execute({
      id: schedule_id,
      user_action
    })

    return res.status(schedule.status).json(schedule)
  }
}

export { DeleteScheduleController }
