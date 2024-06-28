import { Router } from 'express'
import { container } from 'tsyringe'

import { ListTimeSheetController } from '@modules/TimeSheet/useCases/ListTimeSheet/ListTimeSheetController'
import { UpdateOverTimeController } from '@modules/TimeSheet/useCases/UpdateOverTime/UpdateOverTimeController'

import { validateUserTimeSheetPermission } from '../../middlewares/validateUserTimeSheetPermission'

const timeSheetRoutes = Router()

const listTimeSheetController = container.resolve(ListTimeSheetController)
const updateOverTimeController = container.resolve(UpdateOverTimeController)

timeSheetRoutes.get(
  '/list/:user_id',
  validateUserTimeSheetPermission,
  listTimeSheetController.handle
)
timeSheetRoutes.put(
  '/update-overtime/user/:user_id/timesheet/:id',
  validateUserTimeSheetPermission,
  updateOverTimeController.handle
)

export { timeSheetRoutes }
