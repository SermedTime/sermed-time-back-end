import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from '@services/Response/ResponseService'

import { IWorkingDayRepository } from '@modules/Parametrizations/Manager/WorkingDay/repositories/IWorkingDayRepository'
import { IManagerFilters } from '@modules/Parametrizations/shared/interfaces'
import {
  IListWorkingDay,
  WorkingDayListMap
} from '../../mapper/WorkingDayListMap'

export interface IParamsListWorkingDay extends IManagerFilters {}

@injectable()
class ListWorkingDayUseCase {
  constructor(
    @inject('WorkingDayRepository')
    private workingDayRepository: IWorkingDayRepository
  ) {}

  async execute({
    order,
    page = 1,
    records = 1,
    search,
    searchingBy,
    status
  }: IParamsListWorkingDay): Promise<IResponse<IListWorkingDay>> {
    const workingDay = await this.workingDayRepository.list({
      order,
      page,
      records,
      search,
      searchingBy,
      status
    })

    if (!workingDay.success) {
      return ResponseService.setResponseJson<IListWorkingDay>({
        status: HTTP_STATUS.BAD_REQUEST,
        success: workingDay.success,
        message: workingDay.message
      })
    }

    const data =
      workingDay.data.length > 0 ? WorkingDayListMap.toDTO(workingDay.data) : []

    return ResponseService.setResponseJson<IListWorkingDay>({
      status: HTTP_STATUS.OK,
      data,
      page: page > 0 ? page : 1,
      records: data.length > 0 ? Number(workingDay.data[0].TT_REGI) : 0,
      success: workingDay.success
    })
  }
}

export { ListWorkingDayUseCase }
