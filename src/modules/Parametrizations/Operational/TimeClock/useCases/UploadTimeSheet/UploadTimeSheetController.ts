import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadTimeSheetUseCase } from './UploadTimeSheetUseCase'

class UploadTimeSheetController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params
    const { timeSheetFile } = req.body

    const service = container.resolve(UploadTimeSheetUseCase)

    const timeSheet = await service.execute({
      uuid,
      timeSheetFile
    })

    return res.status(timeSheet.status).json(timeSheet)
  }
}

export { UploadTimeSheetController }
