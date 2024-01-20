import { injectable } from 'tsyringe'
import sgMail from '@sendgrid/mail'
import handlebars from 'handlebars'
import fs from 'fs'

import { IMailProvider } from '../IMailProvider'

@injectable()
class SendGrid implements IMailProvider {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    const message = {
      to,
      from: {
        name: 'Sermed Time',
        email: process.env.FROM_MAIL
      },
      subject,
      html: templateHTML
    }

    await sgMail
      .send(message)
      .then(() => {
        console.log('Email sent')
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export { SendGrid }
