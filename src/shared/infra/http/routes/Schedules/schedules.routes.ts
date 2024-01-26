import { Router } from 'express'

import { container } from 'tsyringe'

import { CreateScheduleController } from '@modules/Schedules/useCases/CreateSchedule/CreateScheduleController'

const schedulesRoutes = Router()

const createScheduleController = container.resolve(CreateScheduleController)

schedulesRoutes.post('/create', createScheduleController.handle)

export { schedulesRoutes }
