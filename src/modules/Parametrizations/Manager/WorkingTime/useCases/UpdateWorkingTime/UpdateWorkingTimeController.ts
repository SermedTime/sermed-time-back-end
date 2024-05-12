import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateWorkingTimeUseCase } from './UpdateWorkingTimeUseCase'

class UpdateWorkingTimeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const userId = userAuthenticated(req)

    const { workingTime } = req.body

    const service = container.resolve(UpdateWorkingTimeUseCase)

    const workingTimeResponse = await service.execute({
      userAction: userId,
      workingDayId: uuid,
      workingTime
    })

    return res.status(workingTimeResponse.status).json(workingTimeResponse)
  }
}

export { UpdateWorkingTimeController }
