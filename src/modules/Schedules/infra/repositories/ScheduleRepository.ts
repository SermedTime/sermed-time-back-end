import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { ICreateScheduleDTO } from '@modules/Schedules/dto/ICreateScheduleDTO'
import { IScheduleRepository } from '@modules/Schedules/repositories/IScheduleRepository'
import { IResponseRepository } from 'services/Response/interfaces'

class ScheduleRepository implements IScheduleRepository {
  async Create({
    team_id,
    shift_id,
    user_id,
    schedule_date,
    user_action
  }: Omit<ICreateScheduleDTO, 'id'>): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), user_id)
        .input('UUID_EQUI', sql.NVarChar(36), team_id)
        .input('UUID_TURN', sql.NVarChar(36), shift_id)
        .input('DT_ESCA', sql.Date, schedule_date)
        .input('IN_DELE', sql.Bit, 0)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), user_action)
        .execute('[dbo].[PRC_ESCA_GRAV]')

      const { recordset: schedule } = result

      response = {
        success: true,
        data: schedule
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

export { ScheduleRepository }
