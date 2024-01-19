import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { userAuthenticated } from 'services/UserAuthenticated/UserAuthenticated'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      cpf,
      name,
      socialName,
      email,
      companyUuid,
      position,
      payrollNumber,
      employeeCode,
      pis,
      ctps,
      admissionDate,
      resignationDate,
      status
    } = req.body

    const userId = userAuthenticated(req)

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute({
      cpf,
      name,
      socialName,
      email,
      companyUuid,
      position,
      payrollNumber,
      employeeCode,
      pis,
      ctps,
      admissionDate,
      resignationDate,
      status,
      action_user: userId
    })

    return res.status(user.status).json(user)
  }
}

export { CreateUserController }
