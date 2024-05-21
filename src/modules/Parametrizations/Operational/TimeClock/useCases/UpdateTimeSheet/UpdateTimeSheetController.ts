import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateTimeSheetUseCase } from './UpdateTimeSheetUseCase'

class UpdateTimeSheetController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const service = container.resolve(UpdateTimeSheetUseCase)

    const update = await service.execute(uuid)

    return res.status(update.status).json({ update })
  }
}

export { UpdateTimeSheetController }
