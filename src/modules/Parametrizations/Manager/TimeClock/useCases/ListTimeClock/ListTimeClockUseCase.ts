import { ResponseService } from 'services/Response/ResponseService'

import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { ITimeClockRepository } from '../../repositories/ITimeClockRepository'
import { IListTimeClock, TimeClockMap } from '../../mapper/TimeClockMap'

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
        status: HTTP_STATUS.BAD_REQUEST,
        success: timeClock.success,
        message: timeClock.message
      })
    }

    const data = TimeClockMap.ToDTO(timeClock.data)

    return ResponseService.setResponseJson<IListTimeClock>({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: page > 0 ? page : 1,
      records: data.length > 0 ? Number(timeClock.data[0].TT_REGI) : 0,
      success: timeClock.success
    })
  }
}

export { ListTimeClockUseCase }
