import { Router } from 'express'
import {
  teamRoutes,
  timeClockRoutes,
  userRoutes
} from './Parametrizations/Manager'

const router = Router()

router.use('/parametrizations/time-clock', timeClockRoutes)
router.use('/parametrizations/team', teamRoutes)
router.use('/parametrizations/users', userRoutes)

export { router }
