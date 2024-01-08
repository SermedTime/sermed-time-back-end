import { TimeClockRepository } from '@modules/Parametrizations/TimeClock/infra/SQLServer/repositories/TimeClockRepository'
import { ITimeClockRepository } from '@modules/Parametrizations/TimeClock/repositories/ITimeClockRepository'
import { container } from 'tsyringe'

container.registerSingleton<ITimeClockRepository>(
  'TimeClockRepository',
  TimeClockRepository
)
