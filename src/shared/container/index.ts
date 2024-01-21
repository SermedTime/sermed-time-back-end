import { container } from 'tsyringe'

import '@shared/container/providers'

import { CompaniesRepository } from '@modules/Parametrizations/Manager/Company/infra/SQLServer/repositories/CompaniesRepository'
import { ICompaniesRepository } from '@modules/Parametrizations/Manager/Company/repositories/ICompaniesRepository'
import { TeamRepository } from '@modules/Parametrizations/Manager/Team/infra/SQLServer/repositories/TeamRespository'
import { ITeamRepository } from '@modules/Parametrizations/Manager/Team/repositories/ITeamRepository'
import { TimeClockRepository } from '@modules/Parametrizations/Manager/TimeClock/infra/SQLServer/repositories/TimeClockRepository'
import { ITimeClockRepository } from '@modules/Parametrizations/Manager/TimeClock/repositories/ITimeClockRepository'
import { UsersRepository } from '@modules/Parametrizations/Manager/User/infra/SQLServer/repositories/UsersRepository'
import { IUsersRepository } from '@modules/Parametrizations/Manager/User/repositories/IUsersRepository'
import { IUserAuthRepository } from '@modules/Accounts/repositories/IUserAuthRepository'
import { UserAuthRepository } from '@modules/Accounts/infra/SQLServer/repositories/UserAuthRepository'
import { IUsersTokenRepository } from '@modules/Accounts/repositories/IUsersTokenRepository'
import { UsersTokenRepository } from '@modules/Accounts/infra/SQLServer/repositories/UsersTokenRepository'
import { AssignTeamRepository } from '@modules/Parametrizations/Manager/User/infra/SQLServer/repositories/AssignTeamRepository'
import { IAssignTeamRepository } from '@modules/Parametrizations/Manager/User/repositories/IAssignTeamRepository'

container.registerSingleton<ITimeClockRepository>(
  'TimeClockRepository',
  TimeClockRepository
)

container.registerSingleton<ITeamRepository>('TeamRepository', TeamRepository)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository
)

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository
)

container.registerSingleton<IUserAuthRepository>(
  'UserAuthRepository',
  UserAuthRepository
)

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokenRepository',
  UsersTokenRepository
)

container.registerSingleton<IAssignTeamRepository>(
  'AssignTeamRepository',
  AssignTeamRepository
)
