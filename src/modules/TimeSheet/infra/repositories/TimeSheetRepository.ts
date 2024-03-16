import { statusVerify } from '@utils/statusVerify'
import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { ICreateRegisterDTO } from '@modules/TimeSheet/dto/ICreateRegisterDTO'
import { ITimeSheetRepository } from '@modules/TimeSheet/repositories/ITimeSheetRepository'
import { IResponseRepository } from 'services/Response/interfaces'
import { IListTimeSheetParams } from '@modules/TimeSheet/useCases/ListTimeSheet/ListTimeSheetUseCase'
import { ITimeSheetListRegisters } from '../interfaces'

class TimeSheetRepository implements ITimeSheetRepository {
  async List({
    user_id,
    year,
    month,
    page,
    isHome
  }: IListTimeSheetParams): Promise<
    IResponseRepository<ITimeSheetListRegisters>
  > {
    let response: IResponseRepository<ITimeSheetListRegisters>

    try {
      const pool = getPool()
      const is_home = statusVerify(isHome)

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), user_id)
        .input('ANO', sql.Int, year)
        .input('MES', sql.Int, month)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('IS_HOME', sql.Bit, is_home)
        .execute('[dbo].[PRC_FOLH_PONT_CONS]')

      const { recordset: register } = result

      response = {
        success: true,
        data: register
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async Create(data: ICreateRegisterDTO): Promise<IResponseRepository<any>> {
    let response: IResponseRepository<any>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('NR_PIS', sql.VarChar(12), data.pis)
        .input('UUID_RELO_PONT', sql.NVarChar(36), data.time_clock_uuid)
        .input('NR_MARC', sql.Int, data.appointment_number)
        .input('DT_MARC', sql.DateTime, data.appointment_date)
        .input('CD_CRC_16', sql.Char(4), data.crc16)
        .execute('[dbo].[PRC_FOLH_PONT_GRAV]')

      const { recordset: register } = result

      response = {
        success: true,
        data: register
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

export { TimeSheetRepository }
