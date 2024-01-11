import { Router } from 'express'
import {
  companyRoutes,
  teamRoutes,
  timeClockRoutes,
  userRoutes
} from './Parametrizations/Manager'

const router = Router()

router.use('/parametrizations/time-clock', timeClockRoutes)
router.use('/parametrizations/team', teamRoutes)
router.use('/parametrizations/users', userRoutes)
router.use('/parametrizations/companies', companyRoutes)

export { router }
