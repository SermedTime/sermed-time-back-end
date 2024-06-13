import sql from 'mssql'
import { getPool } from '@shared/infra/database/config'

import { IHomeSummaryRepository } from '@modules/Home/repositories/IHomeSummaryRepository'
import { IResponseRepository } from '@services/Response/interfaces'
import { IOvertimeAndAbsenceSummarySQL } from '../interfaces/IOvertimeAndAbsenceSummarySQL'

class HomeSummaryRepository implements IHomeSummaryRepository {
  async getOvertimeAndAbsenceSummary(
    userId: string
  ): Promise<IResponseRepository<IOvertimeAndAbsenceSummarySQL>> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.UniqueIdentifier, userId)
        .execute('[dbo].[PRC_CARD_HOME_CONS]')

      const { recordset: summary } = result

      response = {
        success: true,
        data: summary
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }
}

export { HomeSummaryRepository }
