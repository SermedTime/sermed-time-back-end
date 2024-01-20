import { container } from 'tsyringe'

import { IMailProvider } from './IMailProvider'
import { EtherealMailProvider } from './implementations/EtherealMailProvider'
import { SendGrid } from './implementations/SendGrid'

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  sendgrid: container.resolve(SendGrid)
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER]
)
