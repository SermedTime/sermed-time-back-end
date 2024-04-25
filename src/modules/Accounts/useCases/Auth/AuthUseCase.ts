import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'

import auth from '@config/auth'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { IUserAuthRepository } from '@modules/Accounts/repositories/IUserAuthRepository'
import { IUserAuth, UserAuthMap } from '@modules/Accounts/mapper/UserAuthMap'
import { IUserRulesSQL } from '@modules/Accounts/infra/SQLServer/interfaces/IUserRulesSQL'

interface IRequest {
  email: string
  password: string
}

interface IAuthResponse {
  accessToken: {
    expiresIn: number
    token: string
  }
  user: IUserAuth
}

@injectable()
class AuthUseCase {
  constructor(
    @inject('UserAuthRepository')
    private userAuthRepository: IUserAuthRepository
  ) {}

  async execute({
    email,
    password
  }: IRequest): Promise<IResponse<IAuthResponse> | IResponse> {
    const user = await this.userAuthRepository.findByEmail(email)
    const { expire_in_token, secret_token } = auth

    const passwordMatch =
      user.success && user.data.length > 0
        ? await compare(password, user.data[0].DS_PASS)
        : false

    if (!user.success || user.data.length === 0 || !passwordMatch) {
      return ResponseService.setResponseJson({
        success: false,
        status: HTTP_STATUS.BAD_REQUEST,
        message: user.success ? 'Login ou Senha incorretos' : user.message
      })
    }

    const permissions = await this.getPermissions(user.data[0].UUID_USUA)

    const userData = UserAuthMap.toDTO(user.data[0], permissions)

    const token = sign({}, secret_token, {
      subject: user.data[0].UUID_USUA,
      expiresIn: expire_in_token
    })

    const { exp: expToken } = verify(token, secret_token) as { exp: number }

    const data: IAuthResponse = {
      accessToken: {
        expiresIn: expToken,
        token
      },
      user: userData
    }

    return ResponseService.setResponseJson<IAuthResponse>({
      success: user.success,
      status: HTTP_STATUS.OK,
      create: true,
      data
    })
  }

  private async getPermissions(user_id: string): Promise<IUserRulesSQL[]> {
    const permissions = await this.userAuthRepository.getPermissions(user_id)

    return permissions.data
  }
}

export { AuthUseCase }
