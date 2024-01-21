import { Router } from 'express'
import { container } from 'tsyringe'

import { ListUsersController } from '@modules/Parametrizations/Manager/User/useCases/ListUsers/ListUsersController'
import { CreateUserController } from '@modules/Parametrizations/Manager/User/useCases/CreateUser/CreateUserController'
import { DetailsUserController } from '@modules/Parametrizations/Manager/User/useCases/DetailsUser/DetailsUserController'
import { UpdateUserController } from '@modules/Parametrizations/Manager/User/useCases/UpdateUser/UpdateUserController'
import { CreateAssignController } from '@modules/Parametrizations/Manager/User/useCases/AssignTeam/CreateAssign/CreateAssignController'

const userRoutes = Router()

const listUsersController = container.resolve(ListUsersController)
const createUserController = container.resolve(CreateUserController)
const detailsUserController = container.resolve(DetailsUserController)
const updateUserController = container.resolve(UpdateUserController)

const createAssignController = container.resolve(CreateAssignController)

userRoutes.get('/', listUsersController.handle)
userRoutes.post('/', createUserController.handle)
userRoutes.get('/:uuid', detailsUserController.handle)
userRoutes.put('/:uuid', updateUserController.handle)

userRoutes.post('/team', createAssignController.handle)

export { userRoutes }
