import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IHolidayRepository } from '../../repositories/IHolidayRepository'
import { ICreateHolidayDTO } from '../../dtos/ICreateHolidayDTO'

@injectable()
class UpdateHolidayUseCase {
  constructor(
    @inject('HolidayRepository')
    private holidayRepository: IHolidayRepository
  ) {}

  async execute({
    uuid,
    date,
    description,
    holidayType,
    state,
    city,
    user_action
  }: ICreateHolidayDTO): Promise<IResponse> {
    const holiday = await this.holidayRepository.upsert({
      uuid,
      date,
      description,
      holidayType,
      state,
      city,
      user_action
    })

    if (!holiday.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        error: holiday.message,
        success: holiday.success
      })
    }

    return ResponseService.setResponseJson({
      data: uuid,
      status: HTTP_STATUS.OK,
      success: holiday.success,
      create: true
    })
  }
}

export { UpdateHolidayUseCase }
