import { inject, injectable } from 'tsyringe'
import { IResponse, ResponseService } from '@services/Response/ResponseService'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IManagerFilters } from '@modules/Parametrizations/shared/interfaces'
import { IHolidayRepository } from '../../repositories/IHolidayRepository'
import { HolidayMap } from '../../mapper/HolidayMap'

export interface IHolidayListParams extends Omit<IManagerFilters, 'status'> {
  holidayType: string
  state: string
  initialDate: string
  finalDate: string
}

@injectable()
class ListHolidayUseCase {
  constructor(
    @inject('HolidayRepository')
    private holidayRepository: IHolidayRepository
  ) {}

  async execute({
    searchingBy,
    search,
    holidayType,
    state,
    initialDate,
    finalDate,
    page = 1,
    records = 1,
    order
  }: IHolidayListParams): Promise<IResponse> {
    const holiday = await this.holidayRepository.list({
      searchingBy,
      search,
      holidayType,
      state,
      initialDate,
      finalDate,
      page,
      records,
      order
    })

    if (!holiday.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: holiday.success,
        message: holiday.message
      })
    }

    const data = holiday.data.length > 0 ? HolidayMap.toDTO(holiday.data) : []

    return ResponseService.setResponseJson({
      status: HTTP_STATUS.OK,
      data,
      page: page > 0 ? page : 1,
      records: data.length > 0 ? Number(holiday.data[0].TT_REGI) : 0,
      success: holiday.success
    })
  }
}

export { ListHolidayUseCase }
