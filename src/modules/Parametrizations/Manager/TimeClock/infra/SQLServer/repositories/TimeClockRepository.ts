import { getPool } from '@shared/infra/database/config'
import sql, { ConnectionPool } from 'mssql'

import { statusVerify } from '@utils/statusVerify'

import { IResponseRepository } from 'services/Response/interfaces'

import { ITimeClockSQL } from '../interfaces/ITimeClockSQL'
import { ITimeClockRepository } from '../../../repositories/ITimeClockRepository'
import {
  ICreateTimeClockDTO,
  IUpdateTimeClockDTO
} from '../../../dtos/ICreateTimeClockDTO'

import { IParamsListTimeClock } from '../../../useCases/ListTimeClock/ListTimeClockUseCase'

class TimeClockRepository implements ITimeClockRepository {
  async upsert({
    city,
    clock_ip,
    manufacturer,
    model,
    name,
    sector,
    state,
    status,
    unit,
    uuid,
    user_action
  }: ICreateTimeClockDTO | IUpdateTimeClockDTO): Promise<IResponseRepository> {
    let response: IResponseRepository
    try {
      const pool: ConnectionPool = getPool()

      const result = await pool
        .request()
        .input('UUID', sql.UniqueIdentifier, uuid)
        .input('NM_RELO_PONT', sql.VarChar(128), name)
        .input('IP_RELO_PONT', sql.VarChar(15), clock_ip)
        .input('DS_UNID', sql.VarChar(128), unit)
        .input('NM_SETO', sql.VarChar(128), sector)
        .input('DS_MUNI', sql.VarChar(128), city)
        .input('DS_UF', sql.VarChar(128), state)
        .input('NM_FABR', sql.VarChar(128), manufacturer)
        .input('NM_MODE', sql.VarChar(128), model)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), user_action)
        .input('IN_STAT', sql.Bit, status)
        .execute('[dbo].[PRC_RELO_PONT_GRAV]')

      const { recordset: timeClock } = result

      response = {
        success: true,
        data: timeClock
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
    order,
    page,
    records,
    search,
    searchingBy,
    status
  }: IParamsListTimeClock): Promise<IResponseRepository<ITimeClockSQL>> {
    let response: IResponseRepository<ITimeClockSQL>
    const name = searchingBy === 'name' ? search : ''
    const uf = searchingBy === 'state' ? search : ''
    const in_stat = statusVerify(status)

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('NM_RELO_PONT', sql.VarChar(128), name)
        .input('UF_RELO_PONT', sql.Char(2), uf)
        .input('IN_STAT', sql.Bit(), in_stat)
        .input('NR_PAGE_INIC', sql.Int(), page)
        .input('TT_REGI_PAGI', sql.Int(), records)
        .input('DS_ORDE_TYPE', sql.VarChar(4), order)
        .execute('[dbo].[PRC_RELO_PONT_CONS]')

      const { recordset: timeClock } = result

      response = {
        success: true,
        data: timeClock
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async findById(uuid: string): Promise<IResponseRepository<ITimeClockSQL>> {
    let response: IResponseRepository<ITimeClockSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_RELO_PONT', sql.UniqueIdentifier, uuid)
        .execute('[dbo].[PRC_RELO_PONT_CONS]')

      const { recordset: timeClock } = result

      response = {
        success: true,
        data: timeClock
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async listIps(): Promise<IResponseRepository<ITimeClockSQL>> {
    let response: IResponseRepository<ITimeClockSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('IN_STAT', sql.Bit, 1)
        .execute('[dbo].[PRC_RELO_PONT_CONS]')

      const { recordset: timeClock } = result

      response = {
        success: true,
        data: timeClock
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

export { TimeClockRepository }
