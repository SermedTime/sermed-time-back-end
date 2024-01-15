import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DetailsCompanyUseCase } from './DetailsCompanyUseCase'

class DetailsCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const detailsCompanyUseCase = container.resolve(DetailsCompanyUseCase)

    const company = await detailsCompanyUseCase.execute(uuid)

    return res.status(company.status).json(company)
  }
}

export { DetailsCompanyController }
