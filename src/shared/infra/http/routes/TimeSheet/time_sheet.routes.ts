import { ListTimeSheetController } from '@modules/TimeSheet/useCases/ListTimeSheet/ListTimeSheetController'
import { Router } from 'express'
import { container } from 'tsyringe'
import { validateUserTimeSheetPermission } from '../../middlewares/validateUserTimeSheetPermission'

const timeSheetRoutes = Router()

const listTimeSheetController = container.resolve(ListTimeSheetController)

timeSheetRoutes.get(
  '/list/:user_id',
  validateUserTimeSheetPermission,
  listTimeSheetController.handle
)

export { timeSheetRoutes }
