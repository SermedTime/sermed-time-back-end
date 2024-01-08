import {
  IListTimeClock,
  TimeClockMap
} from '@modules/TimeClock/mapper/TimeClockMap'
import { ITimeClockRepository } from '@modules/TimeClock/repositories/ITimeClockRepository'
import { ResponseService } from 'services/Response/ResponseService'

import { inject, injectable } from 'tsyringe'

export interface IParamsListTimeClock {
  search: string
  searchingBy: string
  records: string
  status: string
  order: string
  page: number
}

@injectable()
class ListTimeClockUseCase {
  constructor(
    @inject('TimeClockRepository')
    private timeClockRepository: ITimeClockRepository
  ) {}

  async execute({
    search,
    searchingBy,
    records,
    status,
    order,
    page = 1
  }: IParamsListTimeClock) {
    const timeClock = await this.timeClockRepository.list({
      search,
      searchingBy,
      records,
      status,
      order,
      page
    })

    if (!timeClock.success) {
      return ResponseService.setResponseJson<IListTimeClock>({
        status: 400,
        success: timeClock.success,
        message: timeClock.message
      })
    }

    const data = TimeClockMap.ToDTO(timeClock.data)

    return ResponseService.setResponseJson<IListTimeClock>({
      status: data.length > 0 ? 200 : 204,
      data,
      page: page > 0 ? page : 1,
      records: Number(timeClock.data[0].TT_REGI),
      success: timeClock.success
    })
  }
}

export { ListTimeClockUseCase }
