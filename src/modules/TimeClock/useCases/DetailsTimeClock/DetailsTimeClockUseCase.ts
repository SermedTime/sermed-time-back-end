import { inject, injectable } from 'tsyringe'

import { ITimeClockRepository } from '@modules/TimeClock/repositories/ITimeClockRepository'
import { ResponseService } from 'services/Response/ResponseService'
import {
  ITimeClockDetailsMap,
  TimeClockDetailsMap
} from '@modules/TimeClock/mapper/TimeClockDetailsMap'

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
        status: 400,
        message: timeClock.message,
        success: timeClock.success
      })
    }

    const data: ITimeClockDetailsMap = TimeClockDetailsMap.toDTO(
      timeClock.data[0]
    )

    return ResponseService.setResponseJson<ITimeClockDetailsMap>({
      data,
      status: timeClock.data ? 200 : 204,
      success: timeClock.success,
      page: 1,
      records: timeClock.data ? 1 : 0
    })
  }
}

export { DetailsTimeClockUseCase }
