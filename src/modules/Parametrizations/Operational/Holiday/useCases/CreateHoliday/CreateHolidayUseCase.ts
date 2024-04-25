import { inject, injectable } from 'tsyringe'
import { IResponse, ResponseService } from '@services/Response/ResponseService'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IHolidayRepository } from '../../repositories/IHolidayRepository'
import { ICreateHolidayDTO } from '../../dtos/ICreateHolidayDTO'

@injectable()
class CreateHolidayUseCase {
  constructor(
    @inject('HolidayRepository')
    private holidayRepository: IHolidayRepository
  ) {}

  async execute({
    description,
    date,
    holidayType,
    state,
    city,
    user_action
  }: Omit<ICreateHolidayDTO, 'uuid'>): Promise<IResponse> {
    const holiday = await this.holidayRepository.upsert({
      description,
      date,
      holidayType,
      state,
      city,
      user_action
    })

    if (!holiday.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: holiday.success,
        message: holiday.message
      })
    }

    const data = holiday.data[0].UUID_FERI

    return ResponseService.setResponseJson({
      data,
      status: HTTP_STATUS.CREATED,
      success: holiday.success,
      create: true
    })
  }
}

export { CreateHolidayUseCase }
