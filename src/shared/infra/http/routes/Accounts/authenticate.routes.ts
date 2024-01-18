import { Router } from 'express'
import { container } from 'tsyringe'

import { AuthController } from '@modules/Accounts/useCases/Auth/AuthController'

const authenticateRoutes = Router()

const authController = container.resolve(AuthController)

authenticateRoutes.post('/login', authController.handle)

export { authenticateRoutes }
