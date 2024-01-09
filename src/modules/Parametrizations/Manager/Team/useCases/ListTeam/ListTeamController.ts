import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListTeamUseCase } from './ListTeamUseCase'

class ListTeamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { search, searchingBy, records, status, order, page } = req.query

    const listTeamUseCase = container.resolve(ListTeamUseCase)

    const team = await listTeamUseCase.execute({
      search: search as string,
      searchingBy: searchingBy as string,
      records: Number(records),
      status: status as string,
      order: order as string,
      page: Number(page)
    })

    return res.status(team.status).json(team)
  }
}

export { ListTeamController }
