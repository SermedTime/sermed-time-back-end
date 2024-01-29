import { Router } from 'express'

import { container } from 'tsyringe'

import { CreateScheduleController } from '@modules/Schedules/useCases/CreateSchedule/CreateScheduleController'
import { ListScheduleController } from '@modules/Schedules/useCases/ListSchedule/ListScheduleController'

const schedulesRoutes = Router()

const createScheduleController = container.resolve(CreateScheduleController)
const listScheduleController = container.resolve(ListScheduleController)

schedulesRoutes.post('/create', createScheduleController.handle)
schedulesRoutes.get('/list', listScheduleController.handle)

export { schedulesRoutes }
