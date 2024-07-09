import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateTimeSheetUseCase } from './UpdateTimeSheetUseCase'

class UpdateTimeSheetController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      timeSheetId,
      date,
      firstEntry,
      firstExit,
      secondEntry,
      secondExit,
      thirdEntry,
      thirdExit
    } = req.body
    const { user_id: userId } = req.params
    const userAction = userAuthenticated(req)

    const service = container.resolve(UpdateTimeSheetUseCase)

    const timeSheet = await service.execute({
      timeSheetId,
      date,
      userId,
      firstEntry,
      firstExit,
      secondEntry,
      secondExit,
      thirdEntry,
      thirdExit,
      userAction
    })

    return res.status(timeSheet.status).json(timeSheet)
  }
}

export { UpdateTimeSheetController }
