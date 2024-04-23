import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'
import { CreateHolidayUseCase } from './CreateHolidayUseCase'

class CreateHolidayController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { date, description, holidayType, state, city } = req.body
    const userId = userAuthenticated(req)

    const service = container.resolve(CreateHolidayUseCase)

    const team = await service.execute({
      date,
      description,
      holidayType,
      state,
      city,
      user_action: userId
    })

    return res.status(team.status).json(team)
  }
}

export { CreateHolidayController }
