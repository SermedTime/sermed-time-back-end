import { readFileSync } from 'fs'
import { createServer as httpsCreateServer, ServerOptions } from 'https'
import { app } from './app'

const port = process.env.PORT

if (process.env.ENVIRONMENT === 'LOCAL') {
  app.listen(port, () => {
    console.log(`Server Running in http://localhost:${port}`)
  })
} else {
  const privateKeyPath = '/etc/nginx/ssl-certs/sermedsaude.key'
  const certificatePath = '/etc/nginx/ssl-certs/sermedsaude.crt'

  const httpsOptions: ServerOptions = {
    key: readFileSync(privateKeyPath),
    cert: readFileSync(certificatePath)
  }

  httpsCreateServer(httpsOptions, app).listen(port, () => {
    console.log(`Server Running in https://time.sermedsaude.com.br:${port}`)
  })
}
