import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTimeClockUseCase } from './ListTimeClockUseCase'

type IParams = {
  search: string
  searchingBy: string
  records: string
  status: string
  order: string
  page: string
}

class ListTimeClockController {
  async handle(req: Request, res: Response): Promise<Response> {
    const params = req.query.params as unknown as IParams

    const listTimeClockUseCase = container.resolve(ListTimeClockUseCase)

    const timeClock = await listTimeClockUseCase.execute({
      search: params.search,
      searchingBy: params.searchingBy,
      records: params.records,
      status: params.status,
      order: params.order,
      page: Number(params.page)
    })

    return res.status(timeClock.status).json(timeClock)
  }
}

export { ListTimeClockController }
