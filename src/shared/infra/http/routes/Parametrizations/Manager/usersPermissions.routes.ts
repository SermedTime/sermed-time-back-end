import { CreateAssignPermissionController } from '@modules/Parametrizations/Manager/User/useCases/AssignPermission/CreateAssignPermission/CreateAssignPermissionController'
import { DeleteAssignPermissionController } from '@modules/Parametrizations/Manager/User/useCases/AssignPermission/DeleteAssignPermission/DeleteAssignPermissionController'
import { ListAssignPermissionController } from '@modules/Parametrizations/Manager/User/useCases/AssignPermission/ListAssignPermission/ListAssignPermissionController'
import { UpdateAssignPermissionController } from '@modules/Parametrizations/Manager/User/useCases/AssignPermission/UpdateAssignPermission/UpdateAssignPermissionController'
import { Router } from 'express'
import { container } from 'tsyringe'

const usersPermissionsRoutes = Router()

const createAssignPermissionController = container.resolve(
  CreateAssignPermissionController
)
const listAssignPermissionController = container.resolve(
  ListAssignPermissionController
)
const updateAssignPermissionController = container.resolve(
  UpdateAssignPermissionController
)
const deleteAssignPermissionController = container.resolve(
  DeleteAssignPermissionController
)

usersPermissionsRoutes.post('/', createAssignPermissionController.handle)
usersPermissionsRoutes.get('/:user_id', listAssignPermissionController.handle)
usersPermissionsRoutes.put(
  '/:assign_id',
  updateAssignPermissionController.handle
)
usersPermissionsRoutes.delete(
  '/:assign_id',
  deleteAssignPermissionController.handle
)

export { usersPermissionsRoutes }
