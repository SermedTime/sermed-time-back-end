import { TeamRepository } from '@modules/Parametrizations/Manager/Team/infra/SQLServer/repositories/TeamRespository'
import { ITeamRepository } from '@modules/Parametrizations/Manager/Team/repositories/ITeamRepository'
import { TimeClockRepository } from '@modules/Parametrizations/Manager/TimeClock/infra/SQLServer/repositories/TimeClockRepository'
import { ITimeClockRepository } from '@modules/Parametrizations/Manager/TimeClock/repositories/ITimeClockRepository'
import { UsersRepository } from '@modules/Parametrizations/Manager/User/infra/SQLServer/repositories/UsersRepository'
import { IUsersRepository } from '@modules/Parametrizations/Manager/User/repositories/IUsersRepository'
import { container } from 'tsyringe'

container.registerSingleton<ITimeClockRepository>(
  'TimeClockRepository',
  TimeClockRepository
)

container.registerSingleton<ITeamRepository>('TeamRepository', TeamRepository)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
