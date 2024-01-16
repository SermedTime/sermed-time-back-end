import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserUseCase } from './UpdateUserUseCase'

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params
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

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const user = await updateUserUseCase.execute({
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
      uuid
    })

    return res.status(user.status).json(user)
  }
}

export { UpdateUserController }
