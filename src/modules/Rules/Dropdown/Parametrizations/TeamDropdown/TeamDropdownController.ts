import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { TeamDropdownUseCase } from './TeamDropdownUseCase'

class TeamDropdownController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { allTeams } = req.query

    const teamDropdownUseCase = container.resolve(TeamDropdownUseCase)

    const teams = await teamDropdownUseCase.execute(allTeams as string)

    return res.status(teams.status).json(teams)
  }
}

export { TeamDropdownController }
