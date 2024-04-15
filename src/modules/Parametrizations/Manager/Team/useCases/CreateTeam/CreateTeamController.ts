import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'
import { CreateTeamUseCase } from './CreateTeamUseCase'

class CreateTeamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, unit, status } = req.body
    const userId = userAuthenticated(req)

    const createTeamUseCase = container.resolve(CreateTeamUseCase)

    const team = await createTeamUseCase.execute({
      name,
      unitId: unit,
      status,
      user_action: userId
    })

    return res.status(team.status).json(team)
  }
}

export { CreateTeamController }
