import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { ICreateRecoverPassToken } from '@modules/Accounts/dtos/ICreateRecoverPassToken'
import { IUsersTokenRepository } from '@modules/Accounts/repositories/IUsersTokenRepository'
import { IResponseRepository } from 'services/Response/interfaces'

class UsersTokenRepository implements IUsersTokenRepository {
  async create({
    token,
    user_id,
    expires_date
  }: ICreateRecoverPassToken): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), user_id)
        .input('DS_TOKE', sql.VarChar(4096), token)
        .input('UUID_USUA', sql.DateTime, expires_date)
        .execute('[dbo].[PRC_RECU_SENH_GRAV]')

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

export { UsersTokenRepository }
