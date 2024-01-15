import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CompanyDropdownUseCase } from './CompanyDropdownUseCase'

class CompanyDropdownController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { allCompanies } = req.query

    const companyDropdownUseCase = container.resolve(CompanyDropdownUseCase)

    const companies = await companyDropdownUseCase.execute(
      allCompanies as string
    )

    return res.status(companies.status).json(companies)
  }
}

export { CompanyDropdownController }
