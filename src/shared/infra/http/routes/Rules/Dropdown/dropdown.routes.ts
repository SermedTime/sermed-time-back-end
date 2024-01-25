import { Router } from 'express'
import { container } from 'tsyringe'

import { CompanyDropdownController } from '@modules/Rules/Dropdown/Parametrizations/CompanyDropdown/CompanyDropdownController'
import { TeamDropdownController } from '@modules/Rules/Dropdown/Parametrizations/TeamDropdown/TeamDropdownController'
import { PermissionDropdownController } from '@modules/Rules/Dropdown/Parametrizations/PermissionDropdown/PermissionDropdownController'
import { UsersDropdownController } from '@modules/Rules/Dropdown/Parametrizations/UsersDropdown/UsersDropdownController'

const dropdownRoutes = Router()

const companyDropdownController = container.resolve(CompanyDropdownController)
const teamDropdownController = container.resolve(TeamDropdownController)
const permissionsDropdownController = container.resolve(
  PermissionDropdownController
)
const usersDropdownController = container.resolve(UsersDropdownController)

dropdownRoutes.get('/company', companyDropdownController.handle)
dropdownRoutes.get('/team', teamDropdownController.handle)
dropdownRoutes.get('/permissions', permissionsDropdownController.handle)
dropdownRoutes.get('/users', usersDropdownController.handle)

export { dropdownRoutes }
