import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCompanyUseCase } from './CreateCompanyUseCase'

class CreateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      companyName,
      companyCnpj,
      streetName,
      streetNumber,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      status
    } = req.body

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase)

    const company = await createCompanyUseCase.execute({
      companyName,
      companyCnpj,
      streetName,
      streetNumber,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      status
    })

    return res.status(company.status).json(company)
  }
}

export { CreateCompanyController }
