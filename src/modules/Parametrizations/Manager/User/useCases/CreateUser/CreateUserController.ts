import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      uuid,
      cpf,
      name,
      socialName,
      email,
      companyName,
      companyCnpj,
      position,
      payrollNumber,
      employeeCode,
      pis,
      ctps,
      admissionDate,
      resignationDate,
      status
    } = req.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute({
      uuid,
      cpf,
      name,
      socialName,
      email,
      companyName,
      companyCnpj,
      position,
      payrollNumber,
      employeeCode,
      pis,
      ctps,
      admissionDate,
      resignationDate,
      status
    })

    return res.status(user.status).json(user)
  }
}

export { CreateUserController }
