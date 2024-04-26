import 'dotenv/config'
import 'reflect-metadata'
import '@shared/container'
import cors from 'cors'
import express from 'express'

import schedule from 'node-schedule'

import 'express-async-errors'

import { container } from 'tsyringe'
import schedule_rules from '@config/schedule_rules'
import { JobTimeSheet } from '@jobs/UpdateTimeSheet/JobTimeSheet'
import { createConnection } from '../database/config'

import { router } from './routes'

createConnection()
const app = express()

app.use(express.json())

app.use(cors())
app.use('/', router)

const jobTimeSheet = container.resolve(JobTimeSheet)

schedule.scheduleJob(schedule_rules, () => {
  jobTimeSheet.UpdateTimeSheet()
})

export { app }
