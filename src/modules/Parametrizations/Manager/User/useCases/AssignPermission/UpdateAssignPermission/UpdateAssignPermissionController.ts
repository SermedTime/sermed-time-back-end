import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'
import { UpdateAssignPermissionUseCase } from './UpdateAssignPermissionUseCase'

class UpdateAssignPermissionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { is_writer } = req.body
    const { assign_id } = req.params
    const user_action = userAuthenticated(req)

    const service = container.resolve(UpdateAssignPermissionUseCase)

    const assignedPermission = await service.execute({
      uuid: assign_id,
      is_writer,
      user_action
    })

    return res.status(assignedPermission.status).json(assignedPermission)
  }
}

export { UpdateAssignPermissionController }
