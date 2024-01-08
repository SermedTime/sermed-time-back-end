import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { ICreateTimeClock } from '../CreateTimeClock/CreateTimeClockUseCase'
import { ITimeClockRepository } from '../../repositories/ITimeClockRepository'
import { ICreateTimeClockDTO } from '../../dtos/ICreateTimeClockDTO'

@injectable()
class UpdateTimeClockUseCase {
  constructor(
    @inject('TimeClockRepository')
    private timeClockRepository: ITimeClockRepository
  ) {}

  async execute({
    uuid,
    city,
    clock_ip,
    manufacturer,
    model,
    name,
    sector,
    state,
    status,
    unit
  }: ICreateTimeClockDTO): Promise<IResponse<ICreateTimeClock>> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null

    const timeClock = await this.timeClockRepository.upsert({
      uuid,
      city,
      clock_ip,
      manufacturer,
      model,
      name,
      sector,
      state,
      status: in_stat,
      unit
    })

    if (!timeClock.success) {
      return ResponseService.setResponseJson<ICreateTimeClock>({
        status: HTTP_STATUS.BAD_REQUEST,
        success: timeClock.success,
        message: timeClock.message
      })
    }

    return ResponseService.setResponseJson<ICreateTimeClock>({
      data: uuid,
      status: HTTP_STATUS.OK,
      success: timeClock.success
    })
  }
}

export { UpdateTimeClockUseCase }
