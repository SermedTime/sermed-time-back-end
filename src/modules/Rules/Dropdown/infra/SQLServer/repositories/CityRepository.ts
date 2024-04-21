import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { ICityRepository } from '@modules/Rules/Dropdown/repositories/ICityRepository'

import { IResponseRepository } from 'services/Response/interfaces'
import { ICitySQL } from '../interfaces/ICitySQL'

class CityRepository implements ICityRepository {
  async dropdown(state: string): Promise<IResponseRepository<ICitySQL>> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('DS_UF', sql.Char(2), state)
        .execute('[dbo].[PRC_MUNI_CONS]')

      const { recordset: cities } = result

      response = {
        success: true,
        data: cities
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

export { CityRepository }
