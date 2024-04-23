import sql from 'mssql'

import { IResponseRepository } from 'services/Response/interfaces'
import { getPool } from '@shared/infra/database/config'

import { IHolidayRepository } from '../../../repositories/IHolidayRepository'
import { IHolidayListParams } from '../../../useCases/ListHoliday/ListHolidayUseCase'

import { IHolidaySQL } from '../interfaces/IHolidaySQL'

class HolidayRepository implements IHolidayRepository {
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
