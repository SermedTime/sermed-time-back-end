import { ICreateTimeClockDTO } from '@modules/TimeClock/dtos/ICreateTimeClockDTO'
import { ITimeClockRepository } from '@modules/TimeClock/repositories/ITimeClockRepository'
import { ICreateTimeClock } from '@modules/TimeClock/useCases/CreateTimeClock/CreateTimeClockUseCase'
import { getPool } from '@shared/infra/database/config'
import sql from 'mssql'
import { IResponseRepository } from 'services/Response/interfaces'

class TimeClockRepository implements ITimeClockRepository {
  async create({
    city,
    clock_ip,
    manufacturer,
    model,
    name,
    sector,
    state,
    status,
    unit,
    uuid
  }: ICreateTimeClockDTO): Promise<IResponseRepository<ICreateTimeClock>> {
    let response: IResponseRepository<ICreateTimeClock>
    try {
      const pool = getPool()

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
        .input('IN_STAT', sql.Bit, status)
        .execute('[dbo].[PRC_RELO_PONT_GRAV]')

      const { recordset: timeClock } = result

      const uuidTimeClock: string = timeClock[0].UUID_RELO_PONT

      response = {
        success: true,
        data: uuidTimeClock
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
