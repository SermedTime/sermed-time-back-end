import { inject, injectable } from 'tsyringe'
import { resolve } from 'path'

import { v4 as uuidV4 } from 'uuid'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IUsersRepository } from '@modules/Parametrizations/Manager/User/repositories/IUsersRepository'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { IUsersTokenRepository } from '@modules/Accounts/repositories/IUsersTokenRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { sign } from 'jsonwebtoken'
import auth from '@config/auth'
import { IResponseRepository } from 'services/Response/interfaces'
import { IUserSQL } from '@modules/Parametrizations/Manager/User/infra/SQLServer/interfaces'

interface IVariables {
  name: string
  link: string
}

@injectable()
class RecoverPasswordUseCase {
  private token: string | null

  private expires_date: string | null

  private user: IUserSQL | null

  private createRecoverPass: IResponseRepository<string> | null

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokenRepository')
    private usersTokensRepository: IUsersTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private etherealMailProvider: IMailProvider
  ) {
    this.token = null
    this.expires_date = this.dateProvider.convertToUTC(
      this.dateProvider.addHours(3)
    )
    this.user = null
    this.createRecoverPass = null
  }

  async execute(email: string): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'mails',
      'RecoverPassword.hbs'
    )

    if (!user.success || user.data.length === 0) {
      return ResponseService.setResponseJson({
        success: false,
        message: 'Usuário não encontrado',
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    this.user = user.data.length > 0 ? user.data[0] : null

    this.setToken()

    await this.saveToken()

    if (!this.createRecoverPass.success) {
      return ResponseService.setResponseJson({
        success: false,
        message: 'Erro ao criar token',
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const variables: IVariables = this.setVariables()

    this.etherealMailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath
    )

    return ResponseService.setResponseJson({
      success: true,
      status: HTTP_STATUS.OK,
      create: true
    })
  }

  private setToken(): void {
    const { secret_token_recover_password, expitre_in_token_recover_password } =
      auth

    this.token = sign({}, secret_token_recover_password, {
      subject: uuidV4(),
      expiresIn: expitre_in_token_recover_password
    })
  }

  private async saveToken(): Promise<void> {
    this.createRecoverPass = await this.usersTokensRepository.create({
      token: this.token,
      user_id: this.user.UUID_USUA,
      expires_date: this.expires_date
    })
  }

  private setVariables(): IVariables {
    return {
      name: this.user.NM_SOCI_USUA,
      link: `${process.env.FORGOT_MAIL_URL}/${this.token}`
    }
  }
}

export { RecoverPasswordUseCase }
