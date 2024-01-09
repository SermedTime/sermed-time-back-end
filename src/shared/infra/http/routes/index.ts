import { Router } from 'express'
import { teamRoutes, timeClockRoutes } from './Parametrizations/Manager'

const router = Router()

router.use('/parametrizations/time-clock', timeClockRoutes)
router.use('/parametrizations/team', teamRoutes)

export { router }
