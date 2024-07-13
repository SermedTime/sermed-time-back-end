import { userAuthenticated } from '@services/UserAuthenticated/UserAuthenticated'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { OvertimeAndAbsenceSummaryUseCase } from './OvertimeAndAbsenceSummaryUseCase'

class OvertimeAndAbsenceSummary {
  async handle(req: Request, res: Response): Promise<Response> {
    const userId = userAuthenticated(req)

    const service = container.resolve(OvertimeAndAbsenceSummaryUseCase)

    const summary = await service.execute(userId)

    return res.status(summary.status).json(summary)
  }
}

export { OvertimeAndAbsenceSummary }
