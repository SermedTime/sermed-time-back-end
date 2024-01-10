import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUsersUseCase } from './ListUsersUseCase'

class ListUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { search, searchingBy, records, status, order, page } = req.query

    const listUsersUseCase = container.resolve(ListUsersUseCase)

    const users = await listUsersUseCase.execute({
      order: order as string,
      search: search as string,
      searchingBy: searchingBy as string,
      status: status as string,
      page: Number(page),
      records: Number(records)
    })

    return res.status(users.status).json(users)
  }
}

export { ListUsersController }
