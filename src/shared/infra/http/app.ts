import 'reflect-metadata'
import '@shared/container'
import cors from 'cors'
import express from 'express'

import 'express-async-errors'

import { createConnection } from '../database/config'

import { router } from './routes'

createConnection()
const app = express()

app.use(express.json())

app.use(cors())
app.use('/api', router)

export { app }
