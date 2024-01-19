import { Request, Response } from 'express'
import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'

class ChangePasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, confirm_password, oldPassword } = req.body
    const userId = userAuthenticated(req)

    return res
      .status(200)
      .json({ password, confirm_password, userId, oldPassword })
  }
}

export { ChangePasswordController }
