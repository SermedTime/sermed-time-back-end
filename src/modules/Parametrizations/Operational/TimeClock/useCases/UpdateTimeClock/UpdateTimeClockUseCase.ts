import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { ITimeClockRepository } from '../../repositories/ITimeClockRepository'
import { IUpdateTimeClockDTO } from '../../dtos/ICreateTimeClockDTO'

@injectable()
class UpdateTimeClockUseCase {
  constructor(
    @inject('TimeClockRepository')
    private timeClockRepository: ITimeClockRepository
  ) {}

  async execute({
    uuid,
    clock_ip,
    manufacturer,
    model,
    name,
    sector,
    status,
    unit,
    user_action
  }: IUpdateTimeClockDTO): Promise<IResponse> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null

    const timeClock = await this.timeClockRepository.upsert({
      uuid,
      clock_ip,
      manufacturer,
      model,
      name,
      sector,
      status: in_stat,
      unit,
      user_action
    })

    if (!timeClock.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: timeClock.success,
        message: timeClock.message
      })
    }

    return ResponseService.setResponseJson({
      data: uuid,
      status: HTTP_STATUS.OK,
      success: timeClock.success,
      create: true
    })
  }
}

export { UpdateTimeClockUseCase }
