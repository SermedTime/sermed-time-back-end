import { Router } from 'express'

import { CreateTimeClockController } from '@modules/Parametrizations/Operational/TimeClock/useCases/CreateTimeClock/CreateTimeClockController'
import { DetailsTimeClockController } from '@modules/Parametrizations/Operational/TimeClock/useCases/DetailsTimeClock/DetailsTimeClockController'
import { ListTimeClockController } from '@modules/Parametrizations/Operational/TimeClock/useCases/ListTimeClock/ListTimeClockController'
import { UpdateTimeClockController } from '@modules/Parametrizations/Operational/TimeClock/useCases/UpdateTimeClock/UpdateTimeClockController'
import { container } from 'tsyringe'
import { UpdateTimeSheetController } from '@modules/Parametrizations/Operational/TimeClock/useCases/UpdateTimeSheet/UpdateTimeSheetController'

const timeClockRoutes = Router()

const createTimeClockController = container.resolve(CreateTimeClockController)
const listTimeClockController = container.resolve(ListTimeClockController)
const detailsTimeClockController = container.resolve(DetailsTimeClockController)
const updateTimeClockController = container.resolve(UpdateTimeClockController)
const updateTimeSheetController = container.resolve(UpdateTimeSheetController)

timeClockRoutes.post('/', createTimeClockController.handle)
timeClockRoutes.post(
  '/update-time-sheet/:uuid',
  updateTimeSheetController.handle
)
timeClockRoutes.get('/', listTimeClockController.handle)
timeClockRoutes.get('/:uuid', detailsTimeClockController.handle)
timeClockRoutes.put('/:uuid', updateTimeClockController.handle)

export { timeClockRoutes }
