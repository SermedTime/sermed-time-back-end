import { Router } from 'express'
import { timeClockRoutes } from './timeClock.routes'

const router = Router()

router.use('/parametrizations/time-clock', timeClockRoutes)

export { router }
