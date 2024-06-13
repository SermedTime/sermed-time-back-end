import { container } from 'tsyringe'

import '@shared/container/providers'

import { CompaniesRepository } from '@modules/Parametrizations/Manager/Company/infra/SQLServer/repositories/CompaniesRepository'
import { ICompaniesRepository } from '@modules/Parametrizations/Manager/Company/repositories/ICompaniesRepository'
import { TeamRepository } from '@modules/Parametrizations/Manager/Team/infra/SQLServer/repositories/TeamRespository'
import { ITeamRepository } from '@modules/Parametrizations/Manager/Team/repositories/ITeamRepository'
import { TimeClockRepository } from '@modules/Parametrizations/Operational/TimeClock/infra/SQLServer/repositories/TimeClockRepository'
import { ITimeClockRepository } from '@modules/Parametrizations/Operational/TimeClock/repositories/ITimeClockRepository'
import { UsersRepository } from '@modules/Parametrizations/Manager/User/infra/SQLServer/repositories/UsersRepository'
import { IUsersRepository } from '@modules/Parametrizations/Manager/User/repositories/IUsersRepository'
import { IUserAuthRepository } from '@modules/Accounts/repositories/IUserAuthRepository'
import { UserAuthRepository } from '@modules/Accounts/infra/SQLServer/repositories/UserAuthRepository'
import { IUsersTokenRepository } from '@modules/Accounts/repositories/IUsersTokenRepository'
import { UsersTokenRepository } from '@modules/Accounts/infra/SQLServer/repositories/UsersTokenRepository'
import { AssignTeamRepository } from '@modules/Parametrizations/Manager/User/infra/SQLServer/repositories/AssignTeamRepository'
import { IAssignTeamRepository } from '@modules/Parametrizations/Manager/User/repositories/IAssignTeamRepository'
import { IAssignPermissionRepository } from '@modules/Parametrizations/Manager/User/repositories/IAssignPermissionRepository'
import { AssignPermissionRepository } from '@modules/Parametrizations/Manager/User/infra/SQLServer/repositories/AssignPermissionRepository'
import { IShiftRepository } from '@modules/Schedules/repositories/IShiftRepository'
import { ShiftRepository } from '@modules/Schedules/infra/repositories/ShiftRepository'
import { IScheduleRepository } from '@modules/Schedules/repositories/IScheduleRepository'
import { ScheduleRepository } from '@modules/Schedules/infra/repositories/ScheduleRepository'
import { ITimeSheetRepository } from '@modules/TimeSheet/repositories/ITimeSheetRepository'
import { TimeSheetRepository } from '@modules/TimeSheet/infra/repositories/TimeSheetRepository'
import { IUnitRepository } from '@modules/Parametrizations/Manager/Unit/repositories/IUnitRepository'
import { UnitRepository } from '@modules/Parametrizations/Manager/Unit/infra/SQLServer/repositories/UnitRepository'
import { ICityRepository } from '@modules/Rules/Dropdown/repositories/ICityRepository'
import { CityRepository } from '@modules/Rules/Dropdown/infra/SQLServer/repositories/CityRepository'
import { IHolidayRepository } from '@modules/Parametrizations/Operational/Holiday/repositories/IHolidayRepository'
import { HolidayRepository } from '@modules/Parametrizations/Operational/Holiday/infra/SQLServer/repositories/HolidayRepository'
import { IWorkingDayRepository } from '@modules/Parametrizations/Manager/WorkingDay/repositories/IWorkingDayRepository'
import { WorkingDayRepository } from '@modules/Parametrizations/Manager/WorkingDay/infra/repositories/WorkingDayRepository'
import { IWorkingTimeRepository } from '@modules/Parametrizations/Manager/WorkingTime/repositories/IWorkingTimeRepository'
import { WorkingTimeRepository } from '@modules/Parametrizations/Manager/WorkingTime/infra/repositories/SQLServer/WorkingTimeRepository'
import { JobTimeSheet } from '@jobs/UpdateTimeSheet/JobTimeSheet'
import { IJobTimeSheet } from '@jobs/UpdateTimeSheet/IJobTimeSheet'
import { IHomeSummaryRepository } from '@modules/Home/repositories/IHomeSummaryRepository'
import { HomeSummaryRepository } from '@modules/Home/infra/SQLServer/repositories/HomeSummaryRepository'

container.registerSingleton<ITimeClockRepository>(
  'TimeClockRepository',
  TimeClockRepository
)

container.registerSingleton<ITeamRepository>('TeamRepository', TeamRepository)

container.registerSingleton<IUnitRepository>('UnitRepository', UnitRepository)

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

container.registerSingleton<IAssignPermissionRepository>(
  'AssignPermissionRepository',
  AssignPermissionRepository
)

container.registerSingleton<IShiftRepository>(
  'ShiftRepository',
  ShiftRepository
)

container.registerSingleton<IScheduleRepository>(
  'ScheduleRepository',
  ScheduleRepository
)

container.registerSingleton<ITimeSheetRepository>(
  'TimeSheetRepository',
  TimeSheetRepository
)

container.registerSingleton<IHolidayRepository>(
  'HolidayRepository',
  HolidayRepository
)

container.registerSingleton<IWorkingDayRepository>(
  'WorkingDayRepository',
  WorkingDayRepository
)

container.registerSingleton<IWorkingTimeRepository>(
  'WorkingTimeRepository',
  WorkingTimeRepository
)

container.registerSingleton<IHomeSummaryRepository>(
  'HomeSummaryRepository',
  HomeSummaryRepository
)

container.registerSingleton<IJobTimeSheet>('JobTimeSheet', JobTimeSheet)

container.registerSingleton<ICityRepository>('CityRepository', CityRepository)
