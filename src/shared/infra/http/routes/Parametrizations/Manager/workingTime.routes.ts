import { DetailsWorkingTimeController } from '@modules/Parametrizations/Manager/WorkingTime/useCases/DetailsWorkingTime/DetailsWorkingTimeController'
import { Router } from 'express'
import { container } from 'tsyringe'

const workingTime = Router()

const detailsWorkingTimeController = container.resolve(
  DetailsWorkingTimeController
)

workingTime.get('/:uuid', detailsWorkingTimeController.handle)

export { workingTime }
