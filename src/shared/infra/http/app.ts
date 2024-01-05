import express from 'express'
import cors from 'cors'
import { createConnection } from '../database/config'
import { router } from '../routes'

createConnection()
const app = express()

app.use(express.json())

app.use(cors())
app.use(router)

export { app }
