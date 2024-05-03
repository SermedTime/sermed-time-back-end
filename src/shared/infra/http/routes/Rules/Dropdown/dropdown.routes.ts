import { Router } from 'express'
import { container } from 'tsyringe'

import { CompanyDropdownController } from '@modules/Rules/Dropdown/Parametrizations/CompanyDropdown/CompanyDropdownController'
import { TeamDropdownController } from '@modules/Rules/Dropdown/Parametrizations/TeamDropdown/TeamDropdownController'
import { PermissionDropdownController } from '@modules/Rules/Dropdown/Parametrizations/PermissionDropdown/PermissionDropdownController'
import { UsersDropdownController } from '@modules/Rules/Dropdown/Parametrizations/UsersDropdown/UsersDropdownController'
import { ShiftDropdownController } from '@modules/Rules/Dropdown/Schedules/ShiftDropdown/ShiftDropdownController'
import { UnitDropdownController } from '@modules/Rules/Dropdown/Parametrizations/UnitDropdown/UnitDropdownController'
import { CityDropdownController } from '@modules/Rules/Dropdown/Parametrizations/CityDropdown/CityDropdownController'
import { WorkingDayDropdownController } from '@modules/Rules/Dropdown/Parametrizations/WorkingDayDropdown/WorkingDayDropdownController'

const dropdownRoutes = Router()

const companyDropdownController = container.resolve(CompanyDropdownController)
const unitDropdownController = container.resolve(UnitDropdownController)
const teamDropdownController = container.resolve(TeamDropdownController)
const permissionsDropdownController = container.resolve(
  PermissionDropdownController
)
const usersDropdownController = container.resolve(UsersDropdownController)
const shiftDropdownController = container.resolve(ShiftDropdownController)
const cityDropdownController = container.resolve(CityDropdownController)
const workingDayDropdownController = container.resolve(
  WorkingDayDropdownController
)

dropdownRoutes.get('/company', companyDropdownController.handle)
dropdownRoutes.get('/unit', unitDropdownController.handle)
dropdownRoutes.get('/team', teamDropdownController.handle)
dropdownRoutes.get('/permissions', permissionsDropdownController.handle)
dropdownRoutes.get('/users', usersDropdownController.handle)
dropdownRoutes.get('/shifts', shiftDropdownController.handle)
dropdownRoutes.get('/city', cityDropdownController.handle)
dropdownRoutes.get('/working-day', workingDayDropdownController.handle)

export { dropdownRoutes }
