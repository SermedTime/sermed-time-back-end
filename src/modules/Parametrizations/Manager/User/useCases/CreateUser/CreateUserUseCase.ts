import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { resolve } from 'path'

import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { randonPasswordGenerate } from '@utils/RandonPasswordGenerate'
import { hash } from 'bcrypt'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'

interface IVariables {
  name: string
  password: string
  email: string
  link: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider
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
    action_user
  }: ICreateUserDTO): Promise<IResponse> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'mails',
      'Welcome.hbs'
    )

    const pass = await randonPasswordGenerate(12)

    const hashPass = await hash(pass, 8)

    const user = await this.usersRepository.create({
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
      action_user,
      password: hashPass
    })

    if (!user.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: user.success,
        message: user.message
      })
    }

    const variables: IVariables = {
      name: socialName,
      password: pass,
      email,
      link: `${process.env.APP_WEB_URL}/auth/login`
    }

    this.mailProvider.sendMail(
      email,
      'Bem vindo ao sistema de gestão de ponto',
      variables,
      templatePath
    )

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
