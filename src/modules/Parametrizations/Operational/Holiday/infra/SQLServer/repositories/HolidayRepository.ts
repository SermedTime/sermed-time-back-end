import sql from 'mssql'

import { IResponseRepository } from 'services/Response/interfaces'
import { getPool } from '@shared/infra/database/config'

import { IHolidayRepository } from '../../../repositories/IHolidayRepository'
import { IHolidayListParams } from '../../../useCases/ListHoliday/ListHolidayUseCase'

import { IHolidaySQL } from '../interfaces/IHolidaySQL'
import { ICreateHolidayDTO } from '../../../dtos/ICreateHolidayDTO'

class HolidayRepository implements IHolidayRepository {
  async upsert({
    uuid,
    description,
    holidayType,
    date,
    state,
    city,
    user_action
  }: ICreateHolidayDTO): Promise<IResponseRepository> {
    let response: IResponseRepository
    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_FERI', sql.UniqueIdentifier, uuid)
        .input('DT_FERI', sql.Date, date)
        .input('NM_FERI', sql.VarChar(128), description)
        .input('TP_FERI', sql.Char(1), holidayType)
        .input('UUID_MUNI', sql.UniqueIdentifier, city)
        .input('DS_UF', sql.Char(2), state)
        .input('UUID_USUA_ACAO', sql.UniqueIdentifier, user_action)
        .execute('[dbo].[PRC_FERI_GRAV]')

      const { recordset: holiday } = result

      response = {
        success: true,
        data: holiday
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async findById(uuid: string): Promise<IResponseRepository<IHolidaySQL>> {
    let response: IResponseRepository<IHolidaySQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_FERI', sql.UniqueIdentifier, uuid)
        .execute('[dbo].[PRC_FERI_CONS]')

      const { recordset: holiday } = result

      response = {
        success: true,
        data: holiday
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
    holidayType,
    records,
    page,
    order,
    state,
    initialDate,
    finalDate
  }: IHolidayListParams): Promise<IResponseRepository<IHolidaySQL>> {
    let response: IResponseRepository<IHolidaySQL>
    const city = searchingBy === 'city' ? search : ''
    const holidayName = searchingBy === 'holidayName' ? search : ''

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('DT_INIC_FERI', sql.Date, initialDate)
        .input('DT_FINA_FERI', sql.Date, finalDate)
        .input('NM_FERI', sql.VarChar(128), holidayName)
        .input('TP_FERI', sql.Char(1), holidayType)
        .input('NM_MUNI', sql.VarChar(128), city)
        .input('DS_UF', sql.Char(2), state)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('TT_REGI_PAGI', sql.Int, records)
        .input('DS_ORDE_TYPE', sql.VarChar(4), order)
        .execute('[dbo].[PRC_FERI_CONS]')

      const { recordset: holiday } = result

      response = {
        success: true,
        data: holiday
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

export { HolidayRepository }
