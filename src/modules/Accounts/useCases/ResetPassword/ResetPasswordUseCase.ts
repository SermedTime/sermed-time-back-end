import { inject, injectable } from 'tsyringe'

import { IUsersTokenRepository } from '@modules/Accounts/repositories/IUsersTokenRepository'
import { IUserAuthRepository } from '@modules/Accounts/repositories/IUserAuthRepository'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

interface IRequest {
  token: string
  password: string
  confirmPassword: string
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UserAuthRepository')
    private userAuthRepository: IUserAuthRepository,
    @inject('UsersTokenRepository')
    private usersTokensRepository: IUsersTokenRepository
  ) {}

  async execute({
    token,
    password,
    confirmPassword
  }: IRequest): Promise<IResponse> {
    if (password !== confirmPassword) {
      return ResponseService.setResponseJson({
        message: 'Senhas não conferem',
        success: false,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const userToken = await this.usersTokensRepository.findByToken(token)

    if (!userToken.success || userToken.data.length === 0) {
      return ResponseService.setResponseJson({
        message: userToken.success ? 'Token Inválido' : userToken.message,
        success: false,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const change = await this.userAuthRepository.changePassword({
      uuid_usua: userToken.data[0].UUID_USUA,
      password,
      uuid_token: userToken.data[0].UUID_TOKE
    })

    if (!change.success) {
      return ResponseService.setResponseJson({
        message: change.message,
        success: false,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    return ResponseService.setResponseJson({
      message: 'Senha alterada com sucesso',
      success: true,
      status: HTTP_STATUS.OK,
      create: true
    })
  }
}

export { ResetPasswordUseCase }
