import { Router } from 'express'
import { container } from 'tsyringe'

import { CompanyDropdownController } from '@modules/Rules/Dropdown/Parametrizations/CompanyDropdown/CompanyDropdownController'
import { TeamDropdownController } from '@modules/Rules/Dropdown/Parametrizations/TeamDropdown/TeamDropdownController'
import { PermissionDropdownController } from '@modules/Rules/Dropdown/Parametrizations/PermissionDropdown/PermissionDropdownController'

const dropdownRoutes = Router()

const companyDropdownController = container.resolve(CompanyDropdownController)
const teamDropdownController = container.resolve(TeamDropdownController)
const permissionsDropdownController = container.resolve(
  PermissionDropdownController
)

dropdownRoutes.get('/company', companyDropdownController.handle)
dropdownRoutes.get('/team', teamDropdownController.handle)
dropdownRoutes.get('/permissions', permissionsDropdownController.handle)

export { dropdownRoutes }
