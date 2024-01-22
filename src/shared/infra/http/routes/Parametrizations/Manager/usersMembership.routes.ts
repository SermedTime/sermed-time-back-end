import { Router } from 'express'
import { container } from 'tsyringe'

import { CreateAssignController } from '@modules/Parametrizations/Manager/User/useCases/AssignTeam/CreateAssign/CreateAssignController'
import { ListAssignController } from '@modules/Parametrizations/Manager/User/useCases/AssignTeam/ListAssign/ListAssignController'
import { UpdateAssignController } from '@modules/Parametrizations/Manager/User/useCases/AssignTeam/UpdateAssign/UpdateAssignController'
import { DeleteAssignController } from '@modules/Parametrizations/Manager/User/useCases/AssignTeam/DeleteAssign/DeleteAssignController'

const usersMembershipRoutes = Router()

const createAssignController = container.resolve(CreateAssignController)
const listAssignController = container.resolve(ListAssignController)
const updateAssignController = container.resolve(UpdateAssignController)
const deleteAssignController = container.resolve(DeleteAssignController)

usersMembershipRoutes.post('/', createAssignController.handle)
usersMembershipRoutes.get('/:uuid', listAssignController.handle)
usersMembershipRoutes.put('/:uuid', updateAssignController.handle)
usersMembershipRoutes.delete('/:uuid', deleteAssignController.handle)

export { usersMembershipRoutes }
