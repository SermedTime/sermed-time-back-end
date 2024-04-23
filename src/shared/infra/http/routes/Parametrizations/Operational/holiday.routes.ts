import { CreateHolidayController } from '@modules/Parametrizations/Operational/Holiday/useCases/CreateHoliday/CreateHolidayController'
import { ListHolidayController } from '@modules/Parametrizations/Operational/Holiday/useCases/ListHoliday/ListHolidayController'
import { Router } from 'express'
import { container } from 'tsyringe'

const holidayRoutes = Router()

const listHolidayController = container.resolve(ListHolidayController)
const createHolidayController = container.resolve(CreateHolidayController)

holidayRoutes.post('/', createHolidayController.handle)
holidayRoutes.get('/', listHolidayController.handle)

export { holidayRoutes }
