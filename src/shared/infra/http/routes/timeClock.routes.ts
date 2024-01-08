import { CreateTimeClockController } from '@modules/TimeClock/useCases/CreateTimeClock/CreateTimeClockController'
import { DetailsTimeClockController } from '@modules/TimeClock/useCases/DetailsTimeClock/DetailsTimeClockController'
import { ListTimeClockController } from '@modules/TimeClock/useCases/ListTimeClock/ListTimeClockController'
import { Router } from 'express'

const timeClockRoutes = Router()

const createTimeClockController = new CreateTimeClockController()
const listTimeClockController = new ListTimeClockController()
const detailsTimeClockController = new DetailsTimeClockController()

timeClockRoutes.post('/', createTimeClockController.handle)
timeClockRoutes.get('/', listTimeClockController.handle)
timeClockRoutes.get('/:uuid', detailsTimeClockController.handle)

export { timeClockRoutes }
