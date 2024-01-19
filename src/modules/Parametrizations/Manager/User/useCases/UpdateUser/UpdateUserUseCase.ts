import { inject, injectable } from 'tsyringe'
import { ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    admissionDate,
    companyUuid,
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
    uuid,
    action_user
  }: ICreateUserDTO) {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null
    const user = await this.usersRepository.update({
      admissionDate,
      companyUuid,
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
      uuid,
      action_user
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
      status: HTTP_STATUS.OK,
      success: user.success,
      create: true
    })
  }
}

export { UpdateUserUseCase }
