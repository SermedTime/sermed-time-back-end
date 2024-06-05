import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { UpdateCompanyUseCase } from './UpdateCompanyUseCase'

class UpdateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

    const userId = userAuthenticated(req)

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

    const updateCompanyUseCase = container.resolve(UpdateCompanyUseCase)

    const company = await updateCompanyUseCase.execute({
      idErp,
      uuid,
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

export { UpdateCompanyController }
