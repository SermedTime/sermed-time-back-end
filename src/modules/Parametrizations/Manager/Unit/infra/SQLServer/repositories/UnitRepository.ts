import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'
import { statusVerify } from '@utils/statusVerify'

import { IResponseRepository } from 'services/Response/interfaces'
import { IUnitRepository } from '../../../repositories/IUnitRepository'
import { IParamsListUnit } from '../../../useCases/ListUnit/ListUnitUseCase'
import { IUnitSQL } from '../interfaces/IUnitSQL'

class UnitRepository implements IUnitRepository {
  async list({
    page,
    order,
    records,
    search,
    searchingBy,
    status
  }: IParamsListUnit): Promise<IResponseRepository<IUnitSQL>> {
    let response: IResponseRepository<IUnitSQL>
    const name = searchingBy === 'name' ? search : ''
    const in_stat = statusVerify(status)

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('NM_UNID', sql.VarChar(128), name)
        .input('IN_STAT', sql.Bit, in_stat)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('TT_REGI_PAGI', sql.Int, records)
        .input('DS_ORDE_BY', sql.VarChar(4), order)
        .execute('[dbo].[PRC_UNID_CONS]')

      const { recordset: unit } = result

      response = {
        success: true,
        data: unit
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async findById(uuid: string): Promise<IResponseRepository<IUnitSQL>> {
    let response: IResponseRepository<IUnitSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_UNID', sql.UniqueIdentifier, uuid)
        .execute('[dbo].[PRC_UNID_CONS]')

      const { recordset: companies } = result

      response = {
        success: true,
        data: companies
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

export { UnitRepository }
