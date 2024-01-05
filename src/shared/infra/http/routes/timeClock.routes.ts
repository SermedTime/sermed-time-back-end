import { CreateTimeClockController } from '@modules/TimeClock/useCases/CreateTimeClock/CreateTimeClockController'
import { Router } from 'express'

const timeClockRoutes = Router()

const createTimeClockController = new CreateTimeClockController()

timeClockRoutes.post('/', createTimeClockController.handle)

export { timeClockRoutes }
