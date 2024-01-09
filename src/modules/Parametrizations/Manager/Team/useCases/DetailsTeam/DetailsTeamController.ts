import { container } from 'tsyringe'
import { Response, Request } from 'express'
import { DetailsTeamUseCase } from './DetailsTeamUseCase'

class DetailsTeamController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const detailsTeamUseCase = container.resolve(DetailsTeamUseCase)

    const team = await detailsTeamUseCase.execute(uuid as string)

    return res.json(team)
  }
}

export { DetailsTeamController }
