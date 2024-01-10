import { Router } from 'express'

import { ListUsersController } from '@modules/Parametrizations/Manager/User/useCases/ListUsers/ListUsersController'
import { CreateUserController } from '@modules/Parametrizations/Manager/User/useCases/CreateUser/CreateUserController'

const userRoutes = Router()

const listUsersController = new ListUsersController()
const createUserController = new CreateUserController()

userRoutes.get('/', listUsersController.handle)
userRoutes.post('/', createUserController.handle)

export { userRoutes }
