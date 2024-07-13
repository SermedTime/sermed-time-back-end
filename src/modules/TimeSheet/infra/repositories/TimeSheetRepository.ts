import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'
import { generateTypeTimeSQL } from '@utils/generateTypeTimeSQL'

import { ICreateRegisterDTO } from '@modules/TimeSheet/dto/ICreateRegisterDTO'
import { ITimeSheetRepository } from '@modules/TimeSheet/repositories/ITimeSheetRepository'
import { IResponseRepository } from 'services/Response/interfaces'
import { IListTimeSheetParams } from '@modules/TimeSheet/useCases/ListTimeSheet/ListTimeSheetUseCase'
import { IUpdateOvertimeDTO } from '@modules/TimeSheet/dto/IUpdateOvertimeDTO'
import { IUpdateTimeSheetUserDTO } from '@modules/TimeSheet/dto/IUpdateTimeSheetUserDTO'
import { ITimeSheetListRegistersSQL } from '../interfaces'

class TimeSheetRepository implements ITimeSheetRepository {
  async List({
    user_id,
    year,
    month,
    page,
    records,
    order
  }: IListTimeSheetParams): Promise<
    IResponseRepository<ITimeSheetListRegistersSQL>
  > {
    let response: IResponseRepository<ITimeSheetListRegistersSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), user_id)
        .input('NR_MES', sql.Int, month)
        .input('NR_ANO', sql.Int, year)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('TT_REGI_PAGI', sql.Int, records)
        .input('DS_ORDE_TYPE', sql.VarChar(4), order)
        .execute('[dbo].[PRC_RESU_HORA_CONS]')

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

  async CalculateHoursWorked(): Promise<IResponseRepository<any>> {
    let response: IResponseRepository<any>

    try {
      const pool = getPool()

      await pool.request().execute('[dbo].[PRC_RESU_HORA_JOB]')

      response = {
        success: true,
        data: []
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async UpdateOvertime({
    timesheetId,
    overtimeStatus,
    reasorForRejection,
    releaseType,
    userAction
  }: IUpdateOvertimeDTO): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_RESU_HORA', sql.UniqueIdentifier, timesheetId)
        .input('CD_STAT', sql.Char(1), overtimeStatus)
        .input('CD_TIPO_SALD', sql.Char(2), releaseType)
        .input('DS_MOTI_REPR', sql.VarChar(128), reasorForRejection)
        .input('UUID_USUA_ACAO', sql.UniqueIdentifier, userAction)
        .execute('[dbo].[PRC_RESU_HORA_GRAV]')

      const { recordset: overtime } = result

      response = {
        success: true,
        data: overtime
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async UpdateTimeSheetUser({
    timeSheetId,
    userId,
    date,
    firstEntry,
    firstExit,
    secondEntry,
    secondExit,
    thirdEntry,
    thirdExit,
    userAction
  }: IUpdateTimeSheetUserDTO): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_RESU_HORA', sql.UniqueIdentifier, timeSheetId)
        .input('UUID_USUA', sql.UniqueIdentifier, userId)
        .input('DT_MARC', sql.Date, date)
        .input('HR_ENTR_1', sql.Time, generateTypeTimeSQL(firstEntry, date))
        .input('HR_SAID_1', sql.Time, generateTypeTimeSQL(firstExit, date))
        .input('HR_ENTR_2', sql.Time, generateTypeTimeSQL(secondEntry, date))
        .input('HR_SAID_2', sql.Time, generateTypeTimeSQL(secondExit, date))
        .input('HR_ENTR_3', sql.Time, generateTypeTimeSQL(thirdEntry, date))
        .input('HR_SAID_3', sql.Time, generateTypeTimeSQL(thirdExit, date))
        .input('UUID_USUA_ACAO', sql.UniqueIdentifier, userAction)
        .execute('[dbo].[PRC_RESU_HORA_GRAV]')

      const { recordset: timeSheet } = result

      response = {
        success: true,
        data: timeSheet
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
