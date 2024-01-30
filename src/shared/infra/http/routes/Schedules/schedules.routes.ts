import { Router } from 'express'

import { container } from 'tsyringe'

import { CreateScheduleController } from '@modules/Schedules/useCases/CreateSchedule/CreateScheduleController'
import { ListScheduleController } from '@modules/Schedules/useCases/ListSchedule/ListScheduleController'
import { UpdateScheduleController } from '@modules/Schedules/useCases/UpdateSchedule/UpdateScheduleController'
import { DeleteScheduleController } from '@modules/Schedules/useCases/DeleteSchedule/DeleteScheduleController'

const schedulesRoutes = Router()

const createScheduleController = container.resolve(CreateScheduleController)
const listScheduleController = container.resolve(ListScheduleController)
const updateScheduleController = container.resolve(UpdateScheduleController)
const deleteScheduleController = container.resolve(DeleteScheduleController)

schedulesRoutes.post('/create', createScheduleController.handle)
schedulesRoutes.get('/list', listScheduleController.handle)
schedulesRoutes.put('/update/:schedule_id', updateScheduleController.handle)
schedulesRoutes.delete('/delete/:schedule_id', deleteScheduleController.handle)

export { schedulesRoutes }
