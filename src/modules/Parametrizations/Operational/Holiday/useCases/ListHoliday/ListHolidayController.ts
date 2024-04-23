import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListHolidayUseCase } from './ListHolidayUseCase'

class ListHolidayController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      search,
      searchingBy,
      records,
      holidayType,
      state,
      initialDate,
      finalDate,
      order,
      page
    } = req.query

    const service = container.resolve(ListHolidayUseCase)

    const holiday = await service.execute({
      search: search as string,
      searchingBy: searchingBy as string,
      records: Number(records),
      holidayType: holidayType as string,
      state: state as string,
      initialDate: initialDate as string,
      finalDate: finalDate as string,
      order: order as string,
      page: Number(page)
    })

    return res.status(holiday.status).json(holiday)
  }
}

export { ListHolidayController }
