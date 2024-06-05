import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { CreateCompanyUseCase } from './CreateCompanyUseCase'

class CreateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      idErp,
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

    const userId = userAuthenticated(req)

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase)

    const company = await createCompanyUseCase.execute({
      idErp,
      companyName,
      companyCnpj,
      streetName,
      streetNumber,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      status,
      user_action: userId
    })

    return res.status(company.status).json(company)
  }
}

export { CreateCompanyController }
