import { app } from './app'

const port = 3033

app.listen(port, () => {
  console.log(`Server Running in http://localhost:${port}`)
})
