import { container } from 'tsyringe'

import { TimeClockRepository } from '@modules/TimeClock/infra/SQLServer/repositories/TimeClockRepository'
import { ITimeClockRepository } from '@modules/TimeClock/repositories/ITimeClockRepository'

container.registerSingleton<ITimeClockRepository>(
  'TimeClockRepository',
  TimeClockRepository
)
