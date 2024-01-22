import { Router } from 'express'
import { container } from 'tsyringe'

import { CreateAssignController } from '@modules/Parametrizations/Manager/User/useCases/AssignTeam/CreateAssign/CreateAssignController'
import { ListAssignController } from '@modules/Parametrizations/Manager/User/useCases/AssignTeam/ListAssign/ListAssignController'

const usersMembershipRoutes = Router()

const createAssignController = container.resolve(CreateAssignController)
const listAssignController = container.resolve(ListAssignController)

usersMembershipRoutes.post('/', createAssignController.handle)
usersMembershipRoutes.get('/:uuid', listAssignController.handle)

export { usersMembershipRoutes }
