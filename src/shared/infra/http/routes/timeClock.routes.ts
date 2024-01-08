import { CreateTimeClockController } from '@modules/TimeClock/useCases/CreateTimeClock/CreateTimeClockController'
import { ListTimeClockController } from '@modules/TimeClock/useCases/ListTimeClock/ListTimeClockController'
import { Router } from 'express'

const timeClockRoutes = Router()

const createTimeClockController = new CreateTimeClockController()
const listTimeClockController = new ListTimeClockController()

timeClockRoutes.post('/', createTimeClockController.handle)
timeClockRoutes.get('/', listTimeClockController.handle)

export { timeClockRoutes }
