import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTimeClockUseCase } from './ListTimeClockUseCase'

class ListTimeClockController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { search, searchingBy, records, status, order, page } = req.query

    const listTimeClockUseCase = container.resolve(ListTimeClockUseCase)

    const timeClock = await listTimeClockUseCase.execute({
      search: search as string,
      searchingBy: searchingBy as string,
      records: records as string,
      status: status as string,
      order: order as string,
      page: Number(page)
    })

    return res.status(timeClock.status).json(timeClock)
  }
}

export { ListTimeClockController }
