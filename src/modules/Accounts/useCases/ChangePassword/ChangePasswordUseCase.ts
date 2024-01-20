import { IUserAuthRepository } from '@modules/Accounts/repositories/IUserAuthRepository'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { compare } from 'bcrypt'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  currentPassword: string
  newPassword: string
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
    newPassword,
    currentPassword
  }: IRequest): Promise<IResponse> {
    const oldPasswordMatch =
      await this.userAuthRepository.getPasswordById(userId)

    if (!oldPasswordMatch.success) {
      return ResponseService.setResponseJson({
        success: !oldPasswordMatch.success,
        message: 'Erro ao verificar senha',
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const passwordMatch = await compare(
      currentPassword,
      oldPasswordMatch.data[0].DS_PASS
    )

    if (!passwordMatch) {
      return ResponseService.setResponseJson({
        success: false,
        message: 'Senha incorreta',
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const changePassword = await this.userAuthRepository.changePassword({
      uuid_usua: userId,
      password: newPassword,
      is_reset: 0,
      user_action: userId
    })

    if (!changePassword.success) {
      return ResponseService.setResponseJson({
        success: changePassword.success,
        message: 'Erro ao alterar senha',
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    return ResponseService.setResponseJson({
      success: changePassword.success,
      message: 'Senha alterada com sucesso',
      status: HTTP_STATUS.OK,
      create: true
    })
  }
}

export { ChangePasswordUseCase }
