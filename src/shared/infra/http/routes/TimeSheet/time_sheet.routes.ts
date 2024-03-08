import { ListTimeSheetController } from '@modules/TimeSheet/useCases/ListTimeSheet/ListTimeSheetController'
import { Router } from 'express'
import { container } from 'tsyringe'

const timeSheetRoutes = Router()

const listTimeSheetController = container.resolve(ListTimeSheetController)

timeSheetRoutes.get('/list/:user_id', listTimeSheetController.handle)

export { timeSheetRoutes }
