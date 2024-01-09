import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateTeamUseCase } from './UpdateTeamUseCase'

class UpdateTeamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params
    const { name, status } = req.body

    const updateTeamUseCase = container.resolve(UpdateTeamUseCase)

    const team = await updateTeamUseCase.execute({
      uuid,
      name,
      status
    })

    return res.status(team.status).json(team)
  }
}

export { UpdateTeamController }
