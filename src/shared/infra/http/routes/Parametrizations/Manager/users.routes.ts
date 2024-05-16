import { Router } from 'express'
import { container } from 'tsyringe'

import { ListUsersController } from '@modules/Parametrizations/Manager/User/useCases/ListUsers/ListUsersController'
import { CreateUserController } from '@modules/Parametrizations/Manager/User/useCases/CreateUser/CreateUserController'
import { DetailsUserController } from '@modules/Parametrizations/Manager/User/useCases/DetailsUser/DetailsUserController'
import { UpdateUserController } from '@modules/Parametrizations/Manager/User/useCases/UpdateUser/UpdateUserController'
import { AssignWorkingDayController } from '@modules/Parametrizations/Manager/User/useCases/AssignWorkingDay/AssignWorkingDayController'

const userRoutes = Router()

const listUsersController = container.resolve(ListUsersController)
const createUserController = container.resolve(CreateUserController)
const detailsUserController = container.resolve(DetailsUserController)
const updateUserController = container.resolve(UpdateUserController)
const assignWorkingDayController = container.resolve(AssignWorkingDayController)

userRoutes.get('/', listUsersController.handle)
userRoutes.post('/', createUserController.handle)
userRoutes.get('/:uuid', detailsUserController.handle)
userRoutes.put('/:uuid', updateUserController.handle)
userRoutes.put('/working-day/:uuid', assignWorkingDayController.handle)

export { userRoutes }
