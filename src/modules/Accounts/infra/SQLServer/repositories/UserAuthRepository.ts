import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { IUserAuthRepository } from '@modules/Accounts/repositories/IUserAuthRepository'
import { IResponseRepository } from 'services/Response/interfaces'
import { IUserAuthSQL } from '../interfaces/IUserAuthSQL'

class UserAuthRepository implements IUserAuthRepository {
  async findByEmail(email: string): Promise<IResponseRepository<IUserAuthSQL>> {
    let response: IResponseRepository<IUserAuthSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('DS_MAIL', sql.NVarChar(36), email)
        .execute('[dbo].[PRC_USUA_LOGI]')

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

export { UserAuthRepository }
