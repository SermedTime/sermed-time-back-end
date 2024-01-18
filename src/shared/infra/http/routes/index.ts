import { Router } from 'express'
import {
  companyRoutes,
  teamRoutes,
  timeClockRoutes,
  userRoutes
} from './Parametrizations/Manager'
import { dropdownRoutes } from './Rules/Dropdown'
import { authenticateRoutes } from './Accounts'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const router = Router()

router.use('/parametrizations/time-clock', ensureAuthenticated, timeClockRoutes)
router.use('/parametrizations/team', ensureAuthenticated, teamRoutes)
router.use('/parametrizations/users', ensureAuthenticated, userRoutes)
router.use('/parametrizations/companies', ensureAuthenticated, companyRoutes)

router.use('/dropdown', ensureAuthenticated, dropdownRoutes)

router.use('/auth', authenticateRoutes)

export { router }
