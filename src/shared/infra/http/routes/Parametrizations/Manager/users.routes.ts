import { Router } from 'express'

import { ListUsersController } from '@modules/Parametrizations/Manager/User/useCases/ListUsers/ListUsersController'

const userRoutes = Router()

const listUsersController = new ListUsersController()

userRoutes.get('/', listUsersController.handle)

export { userRoutes }
