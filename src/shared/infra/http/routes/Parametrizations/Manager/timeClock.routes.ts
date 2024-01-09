import { CreateTimeClockController } from '@modules/Parametrizations/TimeClock/useCases/CreateTimeClock/CreateTimeClockController'
import { DetailsTimeClockController } from '@modules/Parametrizations/TimeClock/useCases/DetailsTimeClock/DetailsTimeClockController'
import { ListTimeClockController } from '@modules/Parametrizations/TimeClock/useCases/ListTimeClock/ListTimeClockController'
import { UpdateTimeClockController } from '@modules/Parametrizations/TimeClock/useCases/UpdateTimeClock/UpdateTimeClockController'
import { Router } from 'express'

const timeClockRoutes = Router()

const createTimeClockController = new CreateTimeClockController()
const listTimeClockController = new ListTimeClockController()
const detailsTimeClockController = new DetailsTimeClockController()
const updateTimeClockController = new UpdateTimeClockController()

timeClockRoutes.post('/', createTimeClockController.handle)
timeClockRoutes.get('/', listTimeClockController.handle)
timeClockRoutes.get('/:uuid', detailsTimeClockController.handle)
timeClockRoutes.put('/:uuid', updateTimeClockController.handle)

export { timeClockRoutes }
