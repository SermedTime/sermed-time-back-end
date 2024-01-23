import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'
import { CreateAssignPermissionUseCase } from './CreateAssignPermissionUseCase'

class CreateAssignPermissionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, permission_id, is_writer } = req.body
    const userId = userAuthenticated(req)

    const service = container.resolve(CreateAssignPermissionUseCase)

    const assignedPermission = await service.execute({
      user_id,
      permission_id,
      is_writer,
      user_action: userId
    })

    return res.status(200).json(assignedPermission)
  }
}

export { CreateAssignPermissionController }
