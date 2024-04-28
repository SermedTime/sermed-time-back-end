import { Router } from 'express'

import { CreateTimeClockController } from '@modules/Parametrizations/Operational/TimeClock/useCases/CreateTimeClock/CreateTimeClockController'
import { DetailsTimeClockController } from '@modules/Parametrizations/Operational/TimeClock/useCases/DetailsTimeClock/DetailsTimeClockController'
import { ListTimeClockController } from '@modules/Parametrizations/Operational/TimeClock/useCases/ListTimeClock/ListTimeClockController'
import { UpdateTimeClockController } from '@modules/Parametrizations/Operational/TimeClock/useCases/UpdateTimeClock/UpdateTimeClockController'

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
