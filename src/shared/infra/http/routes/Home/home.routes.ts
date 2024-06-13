import { OvertimeAndAbsenceSummary } from '@modules/Home/useCases/OvertimeAndAbsenceSummary/OvertimeAndAbsenceSummaryController'
import { Router } from 'express'
import { container } from 'tsyringe'

const homeRoutes = Router()

const overtimeAndAbsenceSummary = container.resolve(OvertimeAndAbsenceSummary)

homeRoutes.get('/overtime-absence-summary', overtimeAndAbsenceSummary.handle)

export { homeRoutes }
