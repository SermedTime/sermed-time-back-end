import { DetailsWorkingTimeController } from '@modules/Parametrizations/Manager/WorkingTime/useCases/DetailsWorkingTime/DetailsWorkingTimeController'
import { UpdateWorkingTimeController } from '@modules/Parametrizations/Manager/WorkingTime/useCases/UpdateWorkingTime/UpdateWorkingTimeController'
import { Router } from 'express'
import { container } from 'tsyringe'

const workingTime = Router()

const detailsWorkingTimeController = container.resolve(
  DetailsWorkingTimeController
)
const updateWorkingTimeController = container.resolve(
  UpdateWorkingTimeController
)

workingTime.get('/:uuid', detailsWorkingTimeController.handle)
workingTime.put('/:uuid', updateWorkingTimeController.handle)

export { workingTime }
