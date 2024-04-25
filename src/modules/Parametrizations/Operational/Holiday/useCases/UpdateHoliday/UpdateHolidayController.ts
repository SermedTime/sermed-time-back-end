import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { UpdateHolidayUseCase } from './UpdateHolidayUseCase'

class UpdateHolidayController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params
    const { date, description, holidayType, state, city } = req.body
    const userId = userAuthenticated(req)

    const service = container.resolve(UpdateHolidayUseCase)

    const holiday = await service.execute({
      uuid,
      date,
      description,
      holidayType,
      state,
      city,
      user_action: userId
    })

    return res.status(holiday.status).json(holiday)
  }
}

export { UpdateHolidayController }
