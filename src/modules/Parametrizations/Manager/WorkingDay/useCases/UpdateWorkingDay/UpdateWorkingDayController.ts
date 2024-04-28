import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'

import { ICreateWorkingDayDTO } from '../../dtos/ICreateWorkingDayDTO'
import { UpdateWorkingDayUseCase } from './UpdateWorkingDayUseCase'

class UpdateWorkingDayController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const userId = userAuthenticated(req)

    const { workingDayName, status }: ICreateWorkingDayDTO = req.body

    const service = container.resolve(UpdateWorkingDayUseCase)

    const workingDay = await service.execute({
      uuid,
      workingDayName,
      status,
      userAction: userId
    })

    return res.status(workingDay.status).json(workingDay)
  }
}

export { UpdateWorkingDayController }
