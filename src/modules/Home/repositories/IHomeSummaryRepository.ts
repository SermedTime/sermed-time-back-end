import { IResponseRepository } from '@services/Response/interfaces'
import { IOvertimeAndAbsenceSummarySQL } from '../infra/SQLServer/interfaces/IOvertimeAndAbsenceSummarySQL'

interface IHomeSummaryRepository {
  getOvertimeAndAbsenceSummary(
    userId: string
  ): Promise<IResponseRepository<IOvertimeAndAbsenceSummarySQL>>
}

export { IHomeSummaryRepository }
