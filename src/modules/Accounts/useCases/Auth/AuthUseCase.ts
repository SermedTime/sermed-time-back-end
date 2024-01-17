import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'

import auth from '@config/auth'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IUsersTokenRepository } from '@modules/Accounts/repositories/IUsersTokenRepository'
import { IUserAuthRepository } from '@modules/Accounts/repositories/IUserAuthRepository'
import { UserAuthMap } from '@modules/Accounts/mapper/UserAuthMap'

interface IRequest {
  email: string
  password: string
}

interface IAuthResponse {
  expiresIn: number
  token: string
  refreshToken: string
}

@injectable()
class AuthUseCase {
  constructor(
    @inject('UserAuthRepository')
    private userAuthRepository: IUserAuthRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({
    email,
    password
  }: IRequest): Promise<IResponse<IAuthResponse> | IResponse> {
    const user = await this.userAuthRepository.findByEmail(email)
    const {
      expire_in_token,
      secret_token,
      expires_refresh_token_days,
      expire_in_refresh_token,
      secret_refresh_token
    } = auth

    const passwordMatch =
      user.success && user.data.length > 0
        ? await compare(password, user.data[0].DS_PASS)
        : false

    if (!user.success || user.data.length === 0 || !passwordMatch) {
      return ResponseService.setResponseJson({
        success: false,
        status: HTTP_STATUS.BAD_REQUEST,
        message: user.success ? 'Email or password incorrect' : user.message
      })
    }

    const userData = UserAuthMap.toDTO(user.data[0])

    const token = sign(userData, secret_token, {
      subject: userData.userUuid,
      expiresIn: expire_in_token
    })

    const { exp: expToken } = verify(token, secret_token) as { exp: number }

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: userData.userUuid,
      expiresIn: expire_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    )

    await this.usersTokenRepository.create({
      user_id: userData.userUuid,
      expires_date: refresh_token_expires_date,
      refresh_token
    })

    const data: IAuthResponse = {
      expiresIn: expToken,
      token,
      refreshToken: refresh_token
    }

    return ResponseService.setResponseJson<IAuthResponse>({
      success: user.success,
      status: HTTP_STATUS.OK,
      create: true,
      data
    })
  }
}

export { AuthUseCase }
