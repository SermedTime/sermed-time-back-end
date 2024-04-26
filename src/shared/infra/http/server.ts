import { readFileSync } from 'fs'
import { createServer as httpsCreateServer, ServerOptions } from 'https'
import { app } from './app'

const port = process.env.PORT

console.log('===============')
console.log(new Date())
console.log(port)
console.log('===============')

// app.listen(port, () => {
//   console.log(`Server Running in http://localhost:${port}`)
// })

const priveteKeyPath = '/etc/nginx/ssl-certs/sermedsaude.key'
const certificatePath = '/etc/nginx/ssl-certs/sermedsaude.crt'

const httpsOptions: ServerOptions = {
  key: readFileSync(priveteKeyPath),
  cert: readFileSync(certificatePath)
}

httpsCreateServer(httpsOptions, app).listen(port, () => {
  console.log(`Server Running in https://time.sermedsaude.com.br:${port}`)
})
