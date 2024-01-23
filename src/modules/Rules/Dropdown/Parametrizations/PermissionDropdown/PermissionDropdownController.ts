import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { PermissionDropdownUseCase } from './PermissionDropdownUseCase'

class PermissionDropdownController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.query

    const permissionDropdownUseCase = container.resolve(
      PermissionDropdownUseCase
    )

    const permissions = await permissionDropdownUseCase.execute({
      user_id: user_id as string
    })

    return res.status(permissions.status).json(permissions)
  }
}

export { PermissionDropdownController }
