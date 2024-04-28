import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListWorkingDayUseCase } from './ListWorkingDayUseCase'

class ListWorkingDayController {
  async handle(req: Request, res: Response) {
    const { search, searchingBy, records, status, order, page } = req.query

    const service = container.resolve(ListWorkingDayUseCase)

    const workingDay = await service.execute({
      search: search as string,
      searchingBy: searchingBy as string,
      records: Number(records),
      status: status as string,
      order: order as string,
      page: Number(page)
    })

    return res.status(workingDay.status).json(workingDay)
  }
}

export { ListWorkingDayController }
