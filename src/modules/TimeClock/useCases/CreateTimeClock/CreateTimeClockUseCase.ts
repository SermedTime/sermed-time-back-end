import { ITimeClockRepository } from '@modules/TimeClock/repositories/ITimeClockRepository'
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
  }: IRequest): Promise<string> {
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

    return timeClock
  }
}

export { CreateTimeClockUseCase }
