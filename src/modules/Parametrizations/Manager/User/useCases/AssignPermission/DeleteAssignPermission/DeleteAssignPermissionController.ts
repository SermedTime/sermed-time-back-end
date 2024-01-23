import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'

import { DeleteAssignPermissionUseCase } from './DeleteAssignPermissionUseCase'

class DeleteAssignPermissionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { assign_id } = req.params
    const user_action = userAuthenticated(req)

    const service = container.resolve(DeleteAssignPermissionUseCase)

    const assignedPermission = await service.execute({
      uuid: assign_id,
      user_action
    })

    return res.status(assignedPermission.status).json(assignedPermission)
  }
}

export { DeleteAssignPermissionController }
