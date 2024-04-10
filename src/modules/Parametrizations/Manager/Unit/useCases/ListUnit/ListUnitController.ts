import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListUnitUseCase } from './ListUnitUseCase'

class ListUnitController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { search, searchingBy, records, status, order, page } = req.query

    const service = container.resolve(ListUnitUseCase)

    const unit = await service.execute({
      search: search as string,
      searchingBy: searchingBy as string,
      records: Number(records),
      status: status as string,
      order: order as string,
      page: Number(page)
    })

    return res.status(unit.status).json(unit)
  }
}

export { ListUnitController }
