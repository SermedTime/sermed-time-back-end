import { Router } from 'express'
import { container } from 'tsyringe'

import { CompanyDropdownController } from '@modules/Rules/Dropdown/Parametrizations/CompanyDropdown/CompanyDropdownController'
import { TeamDropdownController } from '@modules/Rules/Dropdown/Parametrizations/TeamDropdown/TeamDropdownController'

const dropdownRoutes = Router()

const companyDropdownController = container.resolve(CompanyDropdownController)
const teamDropdownController = container.resolve(TeamDropdownController)

dropdownRoutes.get('/company', companyDropdownController.handle)
dropdownRoutes.get('/team', teamDropdownController.handle)

export { dropdownRoutes }
