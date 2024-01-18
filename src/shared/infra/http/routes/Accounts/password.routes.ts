import { RecoverPasswordController } from '@modules/Accounts/useCases/RecoverPassword/RecoverPasswordController'
import { Router } from 'express'
import { container } from 'tsyringe'

const passwordRoutes = Router()

const recoverPasswordController = container.resolve(RecoverPasswordController)

passwordRoutes.post('/recover_password', recoverPasswordController.handle)

export { passwordRoutes }
