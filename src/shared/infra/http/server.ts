import { AppDataSource } from '../typeorm'
import { app } from './app'

const port = 3333

// app.listen(port, () => {
//   console.log(`Server Running in http://localhost:${port}`)
// })

AppDataSource.initialize().then(async () => {
  console.log('Database connected')
  app.listen(port, () => {
    console.log(`Server Running in http://localhost:${port}`)
  })
})
