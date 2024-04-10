import { Router } from 'express'
import { container } from 'tsyringe'

import { CreateUnitController } from '@modules/Parametrizations/Manager/Unit/useCases/CreateUnit/CreateUnitController'
import { DetailsUnitController } from '@modules/Parametrizations/Manager/Unit/useCases/DetailsUnit/DetailsUnitController'
import { ListUnitController } from '@modules/Parametrizations/Manager/Unit/useCases/ListUnit/ListUnitController'
import { UpdateUnitController } from '@modules/Parametrizations/Manager/Unit/useCases/UpdateUnit/UpdateUnitController'

const unitRoutes = Router()

const createUnitController = container.resolve(CreateUnitController)
const updateUnitController = container.resolve(UpdateUnitController)
const listUnitController = container.resolve(ListUnitController)
const detailsUnitController = container.resolve(DetailsUnitController)

unitRoutes.post('/', createUnitController.handle)
unitRoutes.put('/:uuid', updateUnitController.handle)
unitRoutes.get('/', listUnitController.handle)
unitRoutes.get('/:uuid', detailsUnitController.handle)

export { unitRoutes }
