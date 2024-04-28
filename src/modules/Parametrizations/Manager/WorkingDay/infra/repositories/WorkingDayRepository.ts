import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'
import { statusVerify } from '@utils/statusVerify'

import { IResponseRepository } from '@services/Response/interfaces'
import { ICreateWorkingDayDTO } from '../../dtos/ICreateWorkingDayDTO'
import { IWorkingDayRepository } from '../../repositories/IWorkingDayRepository'
import { IWorkingDaySQL } from '../../repositories/interfaces/IWorkingDaySQL'
import { IParamsListWorkingDay } from '../../useCases/ListWorkingDay/ListWorkingDayUseCase'

class WorkingDayRepository implements IWorkingDayRepository {
  async upsert({
    uuid,
    workingDayName,
    status,
    userAction
  }: ICreateWorkingDayDTO): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_JORN_TRAB', sql.UniqueIdentifier, uuid)
        .input('NM_JORN_TRAB', sql.VarChar(128), workingDayName)
        .input('IN_STAT', sql.Bit, status)
        .input('UUID_USUA_ACAO', sql.UniqueIdentifier, userAction)
        .execute('[dbo].[PRC_JORN_TRAB_GRAV]')

      const { recordset: workingDay } = result

      response = {
        success: true,
        data: workingDay
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
    searchingBy,
    search,
    status,
    order,
    page,
    records
  }: IParamsListWorkingDay): Promise<IResponseRepository<IWorkingDaySQL>> {
    const name = searchingBy === 'description' ? search : ''
    const in_stat = statusVerify(status)

    let response: IResponseRepository<IWorkingDaySQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('NM_JORN_TRAB', sql.VarChar(128), name)
        .input('IN_STAT', sql.Bit, in_stat)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('TT_REGI_PAGI', sql.Int, records)
        .input('DS_ORDE_TYPE', sql.VarChar(4), order)
        .execute('[dbo].[PRC_JORN_TRAB_CONS]')

      const { recordset: workingDay } = result

      response = {
        success: true,
        data: workingDay
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async findById(uuid: string): Promise<IResponseRepository<IWorkingDaySQL>> {
    let response: IResponseRepository<IWorkingDaySQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_JORN_TRAB', sql.UniqueIdentifier, uuid)
        .execute('[dbo].[PRC_JORN_TRAB_CONS]')

      const { recordset: workingDay } = result

      response = {
        success: true,
        data: workingDay
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

export { WorkingDayRepository }
