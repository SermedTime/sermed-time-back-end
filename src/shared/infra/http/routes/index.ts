import { Router } from 'express'
import {
  companyRoutes,
  teamRoutes,
  timeClockRoutes,
  userRoutes
} from './Parametrizations/Manager'
import { dropdownRoutes } from './Rules/Dropdown'
import { authenticateRoutes } from './Accounts'

const router = Router()

router.use('/parametrizations/time-clock', timeClockRoutes)
router.use('/parametrizations/team', teamRoutes)
router.use('/parametrizations/users', userRoutes)
router.use('/parametrizations/companies', companyRoutes)

router.use('/dropdown', dropdownRoutes)

router.use('/auth', authenticateRoutes)

export { router }
