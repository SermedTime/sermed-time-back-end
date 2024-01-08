import { ITimeClockRepository } from '@modules/TimeClock/repositories/ITimeClockRepository'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { inject, injectable } from 'tsyringe'

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

export interface ICreateTimeClock {
  uuid: string
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
  }: IRequest): Promise<IResponse<ICreateTimeClock>> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null

    const timeClock = await this.timeClockRepository.create({
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
        status: 400,
        success: timeClock.success,
        message: timeClock.message
      })
    }

    const data = timeClock[0].UUID_RELO_PONT

    return ResponseService.setResponseJson<ICreateTimeClock>({
      data,
      status: 201,
      success: timeClock.success
    })
  }
}

export { CreateTimeClockUseCase }
