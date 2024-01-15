import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository'
import { ICreateCompanyDTO } from '../../dtos/ICreateCompanyDTO'

@injectable()
class UpdateCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute({
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
  }: ICreateCompanyDTO): Promise<IResponse> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null

    const company = await this.companiesRepository.upsert({
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
      status: in_stat
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
      status: HTTP_STATUS.OK,
      success: true,
      create: true,
      data
    })
  }
}

export { UpdateCompanyUseCase }
