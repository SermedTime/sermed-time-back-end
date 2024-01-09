import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTeamUseCase } from './CreateTeamUseCase'

class CreateTeamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, status } = req.body

    const createTeamUseCase = container.resolve(CreateTeamUseCase)

    const team = await createTeamUseCase.execute({ name, status })

    return res.status(team.status).json(team)
  }
}

export { CreateTeamController }
