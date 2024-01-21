import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'
import { CreateAssignUseCase } from './CreateAssignUseCase'

class CreateAssignController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, team_id, is_supervisor } = req.body
    const userId = userAuthenticated(req)

    const createAssignUseCase = container.resolve(CreateAssignUseCase)

    const membership = await createAssignUseCase.execute({
      user_id,
      team_id,
      is_supervisor,
      userId
    })

    return res.status(membership.status).json(membership)
  }
}

export { CreateAssignController }
