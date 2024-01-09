import { inject, injectable } from 'tsyringe'

import { ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { ITimeClockRepository } from '../../repositories/ITimeClockRepository'
import {
  ITimeClockDetailsMap,
  TimeClockDetailsMap
} from '../../mapper/TimeClockDetailsMap'

@injectable()
class DetailsTimeClockUseCase {
  constructor(
    @inject('TimeClockRepository')
    private timeClockRepository: ITimeClockRepository
  ) {}

  async execute(uuid: string) {
    const timeClock = await this.timeClockRepository.details(uuid)

    if (!timeClock.success) {
      return ResponseService.setResponseJson<ITimeClockDetailsMap>({
        status: HTTP_STATUS.BAD_REQUEST,
        message: timeClock.message,
        success: timeClock.success
      })
    }

    const data: ITimeClockDetailsMap = TimeClockDetailsMap.toDTO(
      timeClock.data[0]
    )

    return ResponseService.setResponseJson<ITimeClockDetailsMap>({
      data,
      status: timeClock.data ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      success: timeClock.success,
      page: 1,
      records: timeClock.data ? 1 : 0
    })
  }
}

export { DetailsTimeClockUseCase }
