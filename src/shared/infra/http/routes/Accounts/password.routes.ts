import { RecoverPasswordController } from '@modules/Accounts/useCases/RecoverPassword/RecoverPasswordController'
import { ResetPasswordController } from '@modules/Accounts/useCases/ResetPassword/ResetPasswordController'
import { Router } from 'express'
import { container } from 'tsyringe'

const passwordRoutes = Router()

const recoverPasswordController = container.resolve(RecoverPasswordController)
const resetPasswordController = container.resolve(ResetPasswordController)

passwordRoutes.post('/recover_password', recoverPasswordController.handle)
passwordRoutes.post('/reset/:token', resetPasswordController.handle)

export { passwordRoutes }
