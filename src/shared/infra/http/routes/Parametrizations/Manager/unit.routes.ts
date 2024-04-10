import { DetailsUnitController } from '@modules/Parametrizations/Manager/Unit/useCases/DetailsUnit/DetailsUnitController'
import { ListUnitController } from '@modules/Parametrizations/Manager/Unit/useCases/ListUnit/ListUnitController'
import { Router } from 'express'
import { container } from 'tsyringe'

const unitRoutes = Router()

const listUnitController = container.resolve(ListUnitController)
const detailsUnitController = container.resolve(DetailsUnitController)

unitRoutes.get('/', listUnitController.handle)
unitRoutes.get('/:uuid', detailsUnitController.handle)

export { unitRoutes }
