import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository'
import {
  CompanyDetailsMap,
  ICompanyDetailsMap
} from '../../mapper/CompanyDetailsMap'

@injectable()
class DetailsCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute(uuid: string): Promise<IResponse> {
    const company = await this.companiesRepository.findById(uuid)

    if (!company.success) {
      return ResponseService.setResponseJson({
        data: company.message,
        status: HTTP_STATUS.BAD_REQUEST,
        success: false
      })
    }

    const data: ICompanyDetailsMap =
      company.data.length > 0
        ? CompanyDetailsMap.toDTO(company.data[0])
        : ({} as ICompanyDetailsMap)

    return ResponseService.setResponseJson({
      data,
      status: company.data ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      success: company.success,
      page: 1,
      records: company.data.length
    })
  }
}

export { DetailsCompanyUseCase }
