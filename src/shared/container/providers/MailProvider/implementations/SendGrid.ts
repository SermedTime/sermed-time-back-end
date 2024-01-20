import { injectable } from 'tsyringe'
import { IMailProvider } from '../IMailProvider'

@injectable()
class SendGrid implements IMailProvider {
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    console.log(to, subject, variables, path)

    throw new Error('Method not implemented.')
  }
}

export { SendGrid }
