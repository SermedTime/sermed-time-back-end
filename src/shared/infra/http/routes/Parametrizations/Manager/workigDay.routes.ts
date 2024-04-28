import { CreateWorkingDayController } from '@modules/Parametrizations/Manager/WorkingDay/useCases/CreateWorkingDay/CreateWorkingDayController'
import { DetailsWorkingDayController } from '@modules/Parametrizations/Manager/WorkingDay/useCases/DetailsWorkingDay/DetailsWorkingDayController'
import { ListWorkingDayController } from '@modules/Parametrizations/Manager/WorkingDay/useCases/ListWorkingDay/ListWorkingDayController'
import { UpdateWorkingDayController } from '@modules/Parametrizations/Manager/WorkingDay/useCases/UpdateWorkingDay/UpdateWorkingDayController'
import { Router } from 'express'

const workingDay = Router()

const listWorkingDayController = new ListWorkingDayController()
const createWorkingDayController = new CreateWorkingDayController()
const updateWorkingDayController = new UpdateWorkingDayController()
const detailsWorkingDayController = new DetailsWorkingDayController()

workingDay.post('/', createWorkingDayController.handle)
workingDay.put('/:uuid', updateWorkingDayController.handle)
workingDay.get('/', listWorkingDayController.handle)
workingDay.get('/:uuid', detailsWorkingDayController.handle)

export { workingDay }
