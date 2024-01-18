import { inject, injectable } from 'tsyringe'
import { v4 as uuidV4 } from 'uuid'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IUsersRepository } from '@modules/Parametrizations/Manager/User/repositories/IUsersRepository'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { IUsersTokenRepository } from '@modules/Accounts/repositories/IUsersTokenRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

@injectable()
class RecoverPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokenRepository')
    private usersTokensRepository: IUsersTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private etherealMailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user.success || user.data.length === 0) {
      return ResponseService.setResponseJson({
        success: false,
        message: 'Usuário não encontrado',
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const token = uuidV4()
    const expires_date = this.dateProvider.convertToUTC(
      this.dateProvider.addHours(3)
    )

    await this.usersTokensRepository.create({
      token,
      user_id: user.data[0].UUID_USUA,
      expires_date
    })

    this.etherealMailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O Link para o reset de senha é: ${token}`
    )

    return ResponseService.setResponseJson({
      success: true,
      status: HTTP_STATUS.OK,
      create: true
    })
  }
}

export { RecoverPasswordUseCase }
