import { Request, Response } from 'express'
import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { container } from 'tsyringe'
import { ChangePasswordUseCase } from './ChangePasswordUseCase'

class ChangePasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { newPassword, currentPassword } = req.body
    const userId = userAuthenticated(req)

    const changePasswordUseCase = container.resolve(ChangePasswordUseCase)

    const changePass = await changePasswordUseCase.execute({
      newPassword,
      userId,
      currentPassword
    })

    return res
      .status(changePass.status)
      .json({ message: changePass.message, status: changePass.status })
  }
}

export { ChangePasswordController }
