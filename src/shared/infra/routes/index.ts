import { Router } from 'express'
import { timeSheetRoutes } from './timeSheet.routes'

const router = Router()

router.use('/time-sheet', timeSheetRoutes)

export { router }
