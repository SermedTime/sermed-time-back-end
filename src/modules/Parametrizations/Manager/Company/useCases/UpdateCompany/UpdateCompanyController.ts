import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCompanyUseCase } from './UpdateCompanyUseCase'

class UpdateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params

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

    const updateCompanyUseCase = container.resolve(UpdateCompanyUseCase)

    const company = await updateCompanyUseCase.execute({
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
      status
    })

    return res.status(company.status).json(company)
  }
}

export { UpdateCompanyController }
