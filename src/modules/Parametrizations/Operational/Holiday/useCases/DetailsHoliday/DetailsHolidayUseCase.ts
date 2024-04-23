import { inject, injectable } from 'tsyringe'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IHolidayRepository } from '../../repositories/IHolidayRepository'
import {
  HolidayDetailsMap,
  IHolidayDetails
} from '../../mapper/HolidayDetailsMap'

@injectable()
class DetailsHolidayUseCase {
  constructor(
    @inject('HolidayRepository')
    private holidayRepository: IHolidayRepository
  ) {}

  async execute(uuid: string): Promise<IResponse> {
    const holiday = await this.holidayRepository.findById(uuid)

    if (!holiday.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: holiday.message,
        success: holiday.success
      })
    }

    const data: IHolidayDetails =
      holiday.data.length > 0
        ? HolidayDetailsMap.toDTO(holiday.data[0])
        : ({} as IHolidayDetails)

    return ResponseService.setResponseJson({
      data,
      status: HTTP_STATUS.OK,
      success: holiday.success,
      page: 1,
      records: holiday.data.length
    })
  }
}

export { DetailsHolidayUseCase }
