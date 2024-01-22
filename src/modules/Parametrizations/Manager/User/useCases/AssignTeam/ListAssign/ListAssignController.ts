import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAssignUseCase } from './ListAssignUseCase'

class ListAssignController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { records, is_supervisor, order, page } = req.query
    const { uuid } = req.params

    const listAssignUseCase = container.resolve(ListAssignUseCase)

    const membership = await listAssignUseCase.execute({
      user_id: uuid,
      is_supervisor: is_supervisor as string,
      order: order as string,
      page: Number(page),
      records: Number(records)
    })

    return res.status(membership.status).json(membership)
  }
}

export { ListAssignController }
