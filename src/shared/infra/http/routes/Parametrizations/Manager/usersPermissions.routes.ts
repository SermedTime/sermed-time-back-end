import { CreateAssignPermissionController } from '@modules/Parametrizations/Manager/User/useCases/AssignPermission/CreateAssignPermission/CreateAssignPermissionController'
import { Router } from 'express'
import { container } from 'tsyringe'

const usersPermissionsRoutes = Router()

const createAssignPermissionController = container.resolve(
  CreateAssignPermissionController
)

usersPermissionsRoutes.post('/', createAssignPermissionController.handle)

export { usersPermissionsRoutes }
