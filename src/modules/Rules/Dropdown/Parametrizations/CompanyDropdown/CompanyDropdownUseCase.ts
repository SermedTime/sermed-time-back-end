import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { ICompaniesRepository } from '@modules/Parametrizations/Manager/Company/repositories/ICompaniesRepository'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { IDropdown } from 'services/Response/interfaces'

@injectable()
class CompanyDropdownUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute(allCompanies: string): Promise<IResponse> {
    const companies = await this.companiesRepository.findAll(allCompanies)

    if (!companies.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: companies.message,
        success: companies.success
      })
    }

    const data: IDropdown[] =
      companies.data.length > 0
        ? companies.data.map(i => {
            return {
              description: i.NM_EMPR,
              uuid: i.UUID_EMPR
            }
          })
        : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: 1,
      records: data.length,
      success: companies.success
    })
  }
}

export { CompanyDropdownUseCase }
