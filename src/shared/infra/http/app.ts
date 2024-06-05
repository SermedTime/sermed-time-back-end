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
import { JobUsers } from '@jobs/UpdateUsers/JobUsers'
import jobUserRules from '@config/jobUserRules'
import { createSermedTimeConnection } from '../database/config'

import { router } from './routes'

createSermedTimeConnection()
const app = express()

app.use(express.json())

app.use(cors())
app.use('/', router)

const jobTimeSheet = container.resolve(JobTimeSheet)
const jobUser = container.resolve(JobUsers)

schedule.scheduleJob(schedule_rules, () => {
  jobTimeSheet.UpdateTimeSheet()
})

schedule.scheduleJob(jobUserRules, () => {
  jobUser.getUsers()
})

export { app }
