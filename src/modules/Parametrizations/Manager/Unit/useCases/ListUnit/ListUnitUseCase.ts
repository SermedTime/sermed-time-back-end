import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IManagerFilters } from '@modules/Parametrizations/shared/interfaces'
import { IUnitRepository } from '../../repositories/IUnitRepository'
import { IListUnit, UnitMap } from '../../mapper/UnitMap'

export interface IParamsListUnit extends IManagerFilters {}

@injectable()
class ListUnitUseCase {
  constructor(
    @inject('UnitRepository')
    private unitRepository: IUnitRepository
  ) {}

  async execute({
    order,
    page = 1,
    records = 1,
    search,
    searchingBy,
    status
  }: IParamsListUnit): Promise<IResponse<IListUnit>> {
    const unit = await this.unitRepository.list({
      order,
      page,
      records,
      search,
      searchingBy,
      status
    })

    if (!unit.success) {
      return ResponseService.setResponseJson<IListUnit>({
        status: HTTP_STATUS.BAD_REQUEST,
        success: unit.success,
        message: unit.message
      })
    }

    const data = unit.data.length > 0 ? UnitMap.toDTO(unit.data) : []

    return ResponseService.setResponseJson<IListUnit>({
      status: HTTP_STATUS.OK,
      data,
      page: page > 0 ? page : 1,
      records: data.length > 0 ? Number(unit.data[0].TT_REGI) : 0,
      success: unit.success
    })
  }
}

export { ListUnitUseCase }
