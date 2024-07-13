import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { UpdateOverTimeUseCase } from './UpdateOverTimeUseCase'

class UpdateOverTimeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { overtimeStatus, reasorForRejection, releaseType } = req.body

    const { id: timesheetId } = req.params

    const userAction = userAuthenticated(req)

    const service = container.resolve(UpdateOverTimeUseCase)

    const overtime = await service.execute({
      timesheetId,
      overtimeStatus,
      reasorForRejection,
      releaseType,
      userAction
    })

    return res.status(overtime.status).json(overtime)
  }
}

export { UpdateOverTimeController }
