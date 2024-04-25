import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { UpdateTeamUseCase } from './UpdateTeamUseCase'

class UpdateTeamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params
    const { name, unit, status } = req.body
    const userId = userAuthenticated(req)

    const updateTeamUseCase = container.resolve(UpdateTeamUseCase)

    const team = await updateTeamUseCase.execute({
      uuid,
      name,
      unitId: unit,
      status,
      user_action: userId
    })

    return res.status(team.status).json(team)
  }
}

export { UpdateTeamController }
