import { ListHolidayController } from '@modules/Parametrizations/Operational/Holiday/useCases/ListHoliday/ListHolidayController'
import { Router } from 'express'
import { container } from 'tsyringe'

const holidayRoutes = Router()

const listHolidayController = container.resolve(ListHolidayController)

holidayRoutes.get('/', listHolidayController.handle)

export { holidayRoutes }
