import { CreateHolidayController } from '@modules/Parametrizations/Operational/Holiday/useCases/CreateHoliday/CreateHolidayController'
import { DetailsHolidayController } from '@modules/Parametrizations/Operational/Holiday/useCases/DetailsHoliday/DetailsHolidayController'
import { ListHolidayController } from '@modules/Parametrizations/Operational/Holiday/useCases/ListHoliday/ListHolidayController'
import { UpdateHolidayController } from '@modules/Parametrizations/Operational/Holiday/useCases/UpdateHoliday/UpdateHolidayController'
import { Router } from 'express'
import { container } from 'tsyringe'

const holidayRoutes = Router()

const createHolidayController = container.resolve(CreateHolidayController)
const listHolidayController = container.resolve(ListHolidayController)
const detailsHolidayController = container.resolve(DetailsHolidayController)
const updateHolidayController = container.resolve(UpdateHolidayController)

holidayRoutes.post('/', createHolidayController.handle)
holidayRoutes.get('/', listHolidayController.handle)
holidayRoutes.get('/:uuid', detailsHolidayController.handle)
holidayRoutes.put('/:uuid', updateHolidayController.handle)

export { holidayRoutes }
