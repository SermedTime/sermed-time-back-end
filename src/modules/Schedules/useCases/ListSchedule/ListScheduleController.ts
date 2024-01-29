import { Request, Response } from 'express'

import { container } from 'tsyringe'

import { ListScheduleUseCase } from './ListScheduleUseCase'

class ListScheduleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      user_id,
      team_id,
      shift_id,
      schedule_date,
      month,
      order,
      records,
      page
    } = req.query

    const service = container.resolve(ListScheduleUseCase)

    const schedule = await service.execute({
      user_id: user_id as string,
      team_id: team_id as string,
      shift_id: shift_id as string,
      schedule_date: schedule_date as string,
      month: Number(month),
      order: order as string,
      records: Number(records),
      page: Number(page)
    })

    return res.status(schedule.status).json(schedule)
  }
}

export { ListScheduleController }
