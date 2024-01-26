import { getPool } from '@shared/infra/database/config'

import { IShiftRepository } from '@modules/Schedules/repositories/IShiftRepository'
import { IResponseRepository } from 'services/Response/interfaces'
import { IShiftSQL } from '../interfaces'

class ShiftRepository implements IShiftRepository {
  public async findShiftDropdown(): Promise<IResponseRepository<IShiftSQL>> {
    let response: IResponseRepository<IShiftSQL>

    try {
      const pool = getPool()

      const result = await pool.request().execute('[dbo].[PRC_TURN_DROP_DOWN]')

      const { recordset: user } = result

      response = {
        success: true,
        data: user
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

export { ShiftRepository }
