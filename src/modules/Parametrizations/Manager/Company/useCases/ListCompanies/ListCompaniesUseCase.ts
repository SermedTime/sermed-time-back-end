import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IManagerFilters } from '@modules/Parametrizations/shared/interfaces'
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository'
import { CompaniesListMap } from '../../mapper/CompaniesListMap'

export interface IParamsListCompanies extends IManagerFilters {}

@injectable()
class ListCompaniesUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute({
    searchingBy,
    search,
    status,
    records = 1,
    page = 1,
    order
  }: IParamsListCompanies): Promise<IResponse> {
    const companies = await this.companiesRepository.list({
      searchingBy,
      search,
      status,
      records,
      page,
      order
    })

    if (!companies.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: companies.success,
        message: companies.message
      })
    }

    const data =
      companies.data.length > 0 ? CompaniesListMap.ToDTO(companies.data) : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: page > 0 ? page : 1,
      records: data.length > 0 ? Number(companies.data[0].TT_REGI) : 0,
      success: companies.success
    })
  }
}

export { ListCompaniesUseCase }
