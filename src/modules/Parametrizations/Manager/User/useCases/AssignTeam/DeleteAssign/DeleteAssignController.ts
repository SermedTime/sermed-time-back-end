import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'
import { DeleteAssignUseCase } from './DeleteAssignUseCase'

class DeleteAssignController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params
    const userId = userAuthenticated(req)

    const deleteAssignUseCase = container.resolve(DeleteAssignUseCase)

    const membership = await deleteAssignUseCase.execute({
      assign_id: uuid,
      userId
    })

    return res.status(membership.status).json(membership)
  }
}

export { DeleteAssignController }
