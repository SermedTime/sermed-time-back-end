import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { ICreateCompanyDTO } from '../../dtos/ICreateCompanyDTO'
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository'

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute({
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
    user_action
  }: ICreateCompanyDTO): Promise<IResponse> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null

    const company = await this.companiesRepository.upsert({
      companyName,
      companyCnpj,
      streetName,
      streetNumber,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      status: in_stat,
      user_action
    })

    if (!company.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: company.success,
        message: company.message
      })
    }

    const data = company.data[0].UUID_EMPR

    return ResponseService.setResponseJson({
      status: HTTP_STATUS.CREATED,
      success: true,
      create: true,
      data
    })
  }
}

export { CreateCompanyUseCase }
