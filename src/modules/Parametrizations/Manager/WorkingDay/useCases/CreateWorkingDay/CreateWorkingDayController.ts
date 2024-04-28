import { Request, Response } from 'express'

import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'

import { container } from 'tsyringe'
import { ICreateWorkingDayDTO } from '../../dtos/ICreateWorkingDayDTO'
import { CreateWorkingDayUseCase } from './CreateWorkingDayUseCase'

class CreateWorkingDayController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { workingDayName, status }: ICreateWorkingDayDTO = req.body

    const userId = userAuthenticated(req)

    const service = container.resolve(CreateWorkingDayUseCase)

    const workingDay = await service.execute({
      workingDayName,
      status,
      userAction: userId
    })

    return res.status(workingDay.status).json(workingDay)
  }
}

export { CreateWorkingDayController }
