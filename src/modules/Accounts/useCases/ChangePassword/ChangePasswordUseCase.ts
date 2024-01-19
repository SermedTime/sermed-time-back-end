import { IUserAuthRepository } from '@modules/Accounts/repositories/IUserAuthRepository'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  oldPassword: string
  password: string
  confirm_password: string
  userId: string
}
@injectable()
class ChangePasswordUseCase {
  constructor(
    @inject('UserAuthRepository')
    private userAuthRepository: IUserAuthRepository
  ) {}

  async execute({
    userId,
    password,
    confirm_password,
    oldPassword
  }: IRequest): Promise<IResponse> {
    if (password !== confirm_password) {
      return ResponseService.setResponseJson({
        success: false,
        message: 'Senhas não conferem',
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    console.log('userId', userId)
    console.log('oldPassword', oldPassword)

    return ResponseService.setResponseJson({
      success: false,
      message: 'Senhas não conferem',
      status: HTTP_STATUS.BAD_REQUEST
    })

    // const user = await this.userAuthRepository.findById(userId)
  }
}

export { ChangePasswordUseCase }
