import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { inject, injectable } from 'tsyringe'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { ITimeClockRepository } from '../../repositories/ITimeClockRepository'

interface IRequest {
  city: string
  clock_ip: string
  manufacturer: string
  model: string
  name: string
  sector: string
  state: string
  status: string
  unit: string
}

@injectable()
class CreateTimeClockUseCase {
  constructor(
    @inject('TimeClockRepository')
    private timeClockRepository: ITimeClockRepository
  ) {}

  async execute({
    city,
    clock_ip,
    manufacturer,
    model,
    name,
    sector,
    state,
    status,
    unit
  }: IRequest): Promise<IResponse> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null

    const timeClock = await this.timeClockRepository.upsert({
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
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: timeClock.success,
        message: timeClock.message
      })
    }

    const data = timeClock.data[0].UUID_RELO_PONT

    return ResponseService.setResponseJson({
      data,
      status: HTTP_STATUS.CREATED,
      success: timeClock.success,
      create: true
    })
  }
}

export { CreateTimeClockUseCase }
