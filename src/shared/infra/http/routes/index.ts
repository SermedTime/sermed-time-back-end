import { Router } from 'express'
import {
  companyRoutes,
  teamRoutes,
  timeClockRoutes,
  userRoutes,
  usersMembershipRoutes,
  usersPermissionsRoutes
} from './Parametrizations/Manager'
import { dropdownRoutes } from './Rules/Dropdown'
import { authenticateRoutes, passwordRoutes } from './Accounts'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const router = Router()

router.use('/parametrizations/time-clock', ensureAuthenticated, timeClockRoutes)
router.use('/parametrizations/team', ensureAuthenticated, teamRoutes)
router.use('/parametrizations/users', ensureAuthenticated, userRoutes)
router.use(
  '/parametrizations/assign-teams',
  ensureAuthenticated,
  usersMembershipRoutes
)
router.use(
  '/parametrizations/assing-permissions',
  ensureAuthenticated,
  usersPermissionsRoutes
)
router.use('/parametrizations/companies', ensureAuthenticated, companyRoutes)

router.use('/dropdown', ensureAuthenticated, dropdownRoutes)

router.use('/auth', authenticateRoutes)
router.use('/password', passwordRoutes)

export { router }
