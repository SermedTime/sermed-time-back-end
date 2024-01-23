import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAssignPermissionUseCase } from './ListAssignPermissionUseCase'

class ListAssignPermissionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { records, is_writer, order, page } = req.query
    const { user_id } = req.params

    const service = container.resolve(ListAssignPermissionUseCase)

    const permissionsAssigned = await service.execute({
      user_id,
      is_writer: is_writer as string,
      order: order as string,
      page: Number(page),
      records: Number(records)
    })

    return res.status(permissionsAssigned.status).json(permissionsAssigned)
  }
}

export { ListAssignPermissionController }
