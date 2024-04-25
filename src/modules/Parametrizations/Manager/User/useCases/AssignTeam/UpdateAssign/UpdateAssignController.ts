import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { UpdateAssignUseCase } from './UpdateAssignUseCase'

class UpdateAssignController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { is_supervisor } = req.body
    const { uuid } = req.params
    const userId = userAuthenticated(req)

    const updateAssignUseCase = container.resolve(UpdateAssignUseCase)

    const membership = await updateAssignUseCase.execute({
      assign_id: uuid,
      is_supervisor,
      userId
    })

    return res.status(membership.status).json(membership)
  }
}

export { UpdateAssignController }
