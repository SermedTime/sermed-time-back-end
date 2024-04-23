import { container } from 'tsyringe'
import { Response, Request } from 'express'

import { DetailsHolidayUseCase } from './DetailsHolidayUseCase'

class DetailsHolidayController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const service = container.resolve(DetailsHolidayUseCase)

    const holiday = await service.execute(uuid as string)

    return res.json(holiday)
  }
}

export { DetailsHolidayController }
