import { Router } from 'express'
import { container } from 'tsyringe'

import { ListUsersController } from '@modules/Parametrizations/Manager/User/useCases/ListUsers/ListUsersController'
import { CreateUserController } from '@modules/Parametrizations/Manager/User/useCases/CreateUser/CreateUserController'
import { DetailsUserController } from '@modules/Parametrizations/Manager/User/useCases/DetailsUser/DetailsUserController'

const userRoutes = Router()

const listUsersController = container.resolve(ListUsersController)
const createUserController = container.resolve(CreateUserController)
const detailsUserController = container.resolve(DetailsUserController)

userRoutes.get('/', listUsersController.handle)
userRoutes.post('/', createUserController.handle)
userRoutes.get('/:uuid', detailsUserController.handle)

export { userRoutes }
