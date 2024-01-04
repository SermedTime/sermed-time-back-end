import { dataBaseConnection } from '../database/config'
import { app } from './app'

const port = 3333

async function startServer() {
  await dataBaseConnection()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server Running in http://localhost:${port}`)
      })
    })
    .catch(err => {
      throw err.message
    })
}

startServer()
