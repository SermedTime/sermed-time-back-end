import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UsersDropdownUseCase } from './UsersDropdownUseCase'

class UsersDropdownController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { team_id } = req.query

    const service = container.resolve(UsersDropdownUseCase)

    const users = await service.execute({
      team_id: team_id as string
    })

    return res.status(users.status).json(users)
  }
}

export { UsersDropdownController }
