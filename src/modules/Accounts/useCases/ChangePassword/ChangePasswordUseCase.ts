import { IUserAuthRepository } from '@modules/Accounts/repositories/IUserAuthRepository'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { compare } from 'bcrypt'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  oldPassword: string
  password: string
  confirmPassword: string
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
    confirmPassword,
    oldPassword
  }: IRequest): Promise<IResponse> {
    if (password !== confirmPassword) {
      return ResponseService.setResponseJson({
        success: false,
        message: 'Senhas não conferem',
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

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
      oldPassword,
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
      password,
      is_reset: 0
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
