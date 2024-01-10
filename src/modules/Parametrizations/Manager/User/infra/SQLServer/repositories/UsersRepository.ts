import sql from 'mssql'
import { IResponseRepository } from 'services/Response/interfaces'
import { statusVerify } from '@utils/statusVerify'
import { getPool } from '@shared/infra/database/config'
import { IParamsListUsers } from '../../../useCases/ListUsers/ListUsersUseCase'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IUserSQL } from '../interfaces'

class UsersRepository implements IUsersRepository {
  async list({
    order,
    page,
    records,
    search,
    searchingBy,
    status
  }: IParamsListUsers): Promise<IResponseRepository<IUserSQL>> {
    let response: IResponseRepository<IUserSQL>

    const in_stat = statusVerify(status)
    const name = searchingBy === 'name' ? search : ''
    const socialName = searchingBy === 'socialName' ? search : ''
    const cpf = searchingBy === 'cpf' ? search : ''
    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('NM_USUA', sql.VarChar(256), name)
        .input('NM_SOCI_USUA', sql.VarChar(256), socialName)
        .input('NR_CPF_USUA', sql.VarChar(11), cpf)
        .input('IN_STAT', sql.Bit, in_stat)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('TT_REGI_PAGI', sql.Int, records)
        .input('DS_ORDE_TYPE', sql.VarChar(4), order)
        .execute('[dbo].[PRC_USUA_CONS]')

      const { recordset: users } = result

      response = {
        success: true,
        data: users
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

export { UsersRepository }
