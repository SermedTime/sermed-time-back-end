import { Request, Response } from 'express'

import { container } from 'tsyringe'

import { ListTimeSheetUseCase } from './ListTimeSheetUseCase'

class ListTimeSheetController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { month, year, page } = req.query
    const { user_id } = req.params

    const service = container.resolve(ListTimeSheetUseCase)

    const register = await service.execute({
      user_id: user_id as string,
      year: Number(year),
      month: Number(month),
      page: Number(page)
    })

    return res.status(register.status).json(register)
  }
}

export { ListTimeSheetController }
