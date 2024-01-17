import sql from 'mssql'

import { ICreateUserTokenDTO } from '@modules/Accounts/dtos/ICreateUserTokenDTO'
import { IUsersTokenRepository } from '@modules/Accounts/repositories/IUsersTokenRepository'
import { getPool } from '@shared/infra/database/config'
// import { IResponse } from 'services/Response/ResponseService'

class UsersTokenRepository implements IUsersTokenRepository {
  async create({
    expires_date,
    refresh_token,
    user_id
  }: ICreateUserTokenDTO): Promise<string> {
    const pool = await getPool()

    const result = await pool
      .request()
      .input('DS_REFR_TOKE', sql.VarChar(4096), refresh_token)
      .input('UUID_USUA', sql.NVarChar(36), user_id)
      .input('DT_EXPI', sql.DateTime, expires_date)
      .execute('[dbo].[PRC_TOKE_USUA_GRAV]')

    const { recordset: token } = result

    const { UUID_REFR_TOKE: token_id } = token[0]

    console.log(token_id)

    return token_id
  }
}

export { UsersTokenRepository }
