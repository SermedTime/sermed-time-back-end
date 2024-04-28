import { Router } from 'express'

import {
  companyRoutes,
  teamRoutes,
  timeClockRoutes,
  unitRoutes,
  userRoutes,
  usersMembershipRoutes,
  usersPermissionsRoutes,
  workingDay
} from './Parametrizations/Manager'

import { holidayRoutes } from './Parametrizations/Operational'

import { dropdownRoutes } from './Rules/Dropdown'

import { authenticateRoutes, passwordRoutes } from './Accounts'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { schedulesRoutes } from './Schedules'

import { timeSheetRoutes } from './TimeSheet'

const router = Router()

// PARAMETRIZATIONS MANAGEMENT
router.use('/parametrizations/time-clock', ensureAuthenticated, timeClockRoutes)
router.use('/parametrizations/team', ensureAuthenticated, teamRoutes)
router.use('/parametrizations/units', ensureAuthenticated, unitRoutes)
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
router.use(
  '/parametrizations/management/working-day',
  ensureAuthenticated,
  workingDay
)

// PARAMETRIZATIONS OPERATIONAL
router.use(
  '/parametrizations/operational/holiday',
  ensureAuthenticated,
  holidayRoutes
)

// RULES -> DROPDOWN
router.use('/dropdown', ensureAuthenticated, dropdownRoutes)

// SCHEDULES
router.use('/schedule', ensureAuthenticated, schedulesRoutes)

// TIME SHEET
router.use('/overview/time-sheet', ensureAuthenticated, timeSheetRoutes)

// ACCOUNTS
router.use('/auth', authenticateRoutes)
router.use('/password', passwordRoutes)

export { router }
