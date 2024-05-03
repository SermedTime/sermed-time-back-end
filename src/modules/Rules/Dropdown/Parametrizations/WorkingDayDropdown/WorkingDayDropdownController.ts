import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { WorkingDayDropdownUseCase } from './WorkingDayDropdownUseCase'

export class WorkingDayDropdownController {
  async handle(_req: Request, res: Response) {
    const service = container.resolve(WorkingDayDropdownUseCase)

    const workingDayDropDown = await service.execute()

    return res.status(workingDayDropDown.status).json(workingDayDropDown)
  }
}
