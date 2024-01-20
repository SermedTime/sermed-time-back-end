import { ChangePasswordController } from '@modules/Accounts/useCases/ChangePassword/ChangePasswordController'
import { RecoverPasswordController } from '@modules/Accounts/useCases/RecoverPassword/RecoverPasswordController'
import { ResetPasswordController } from '@modules/Accounts/useCases/ResetPassword/ResetPasswordController'
import { Router } from 'express'
import { container } from 'tsyringe'
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated'

const passwordRoutes = Router()

const recoverPasswordController = container.resolve(RecoverPasswordController)
const resetPasswordController = container.resolve(ResetPasswordController)
const changePasswordController = container.resolve(ChangePasswordController)

passwordRoutes.post('/recover', recoverPasswordController.handle)
passwordRoutes.post('/reset/:token', resetPasswordController.handle)
passwordRoutes.post(
  '/change',
  ensureAuthenticated,
  changePasswordController.handle
)

export { passwordRoutes }
