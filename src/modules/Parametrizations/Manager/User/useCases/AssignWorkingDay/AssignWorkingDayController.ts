import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AssignWorkingDayUseCase } from './AssignWorkingDayUseCase'

class AssignWorkingDayController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { workingDayId } = req.body
    const { uuid } = req.params
    const userAction = userAuthenticated(req)

    const service = container.resolve(AssignWorkingDayUseCase)

    const user = await service.execute({
      userId: uuid as string,
      workingDayId: workingDayId as string,
      userAction
    })

    return res.status(user.status).json(user)
  }
}

export { AssignWorkingDayController }
