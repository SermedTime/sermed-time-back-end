import { inject, injectable } from 'tsyringe'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    admissionDate,
    companyCnpj,
    companyName,
    cpf,
    ctps,
    email,
    employeeCode,
    name,
    payrollNumber,
    pis,
    position,
    socialName,
    status,
    resignationDate,
    uuid
  }: ICreateUserDTO): Promise<IResponse> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null
    const user = await this.usersRepository.upsert({
      admissionDate,
      companyCnpj,
      companyName,
      cpf,
      ctps,
      email,
      employeeCode,
      name,
      payrollNumber,
      pis,
      position,
      socialName,
      status: in_stat,
      resignationDate,
      uuid
    })

    if (!user.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: user.success,
        message: user.message
      })
    }

    const data = user.data[0].UUID_USUA

    return ResponseService.setResponseJson({
      data,
      status: HTTP_STATUS.CREATED,
      success: user.success,
      create: true
    })
  }
}

export { CreateUserUseCase }
