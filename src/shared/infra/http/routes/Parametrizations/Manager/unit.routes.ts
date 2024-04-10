import { ListUnitController } from '@modules/Parametrizations/Manager/Unit/useCases/ListUnit/ListUnitController'
import { Router } from 'express'
import { container } from 'tsyringe'

const unitRoutes = Router()

const listUnitController = container.resolve(ListUnitController)

unitRoutes.get('/', listUnitController.handle)

export { unitRoutes }
