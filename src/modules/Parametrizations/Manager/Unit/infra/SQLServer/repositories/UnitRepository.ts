import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'
import { statusVerify } from '@utils/statusVerify'

import { IResponseRepository } from 'services/Response/interfaces'
import { IUnitRepository } from '../../../repositories/IUnitRepository'
import { IParamsListUnit } from '../../../useCases/ListUnit/ListUnitUseCase'
import { IUnitSQL } from '../interfaces/IUnitSQL'
import { ICreateUnitDTO } from '../../../dtos/ICreateUnitDTO'

class UnitRepository implements IUnitRepository {
  async upsert({
    uuid,
    unitName,
    streetName,
    streetNumber,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    ibgeCode,
    status,
    user_action
  }: ICreateUnitDTO): Promise<IResponseRepository<any>> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_UNID', sql.UniqueIdentifier, uuid)
        .input('NM_UNID', sql.VarChar(128), unitName)
        .input('NR_CEP', sql.VarChar(9), zipCode)
        .input('DS_LOGR', sql.VarChar(128), streetName)
        .input('NR_LOGR', sql.VarChar(10), streetNumber)
        .input('DS_COMP', sql.VarChar(16), complement)
        .input('NM_BAIR', sql.VarChar(128), neighborhood)
        .input('NM_MUNI', sql.VarChar(128), city)
        .input('DS_UF', sql.Char(2), state)
        .input('CD_IBGE', sql.Int, ibgeCode)
        .input('IN_STAT', sql.Bit, status)
        .input('UUID_USUA_ACAO', sql.UniqueIdentifier, user_action)
        .execute('[dbo].[PRC_UNID_GRAV]')

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
