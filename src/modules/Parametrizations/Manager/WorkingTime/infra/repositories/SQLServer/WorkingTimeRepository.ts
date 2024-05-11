import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { IResponseRepository } from '@services/Response/interfaces'
import { formatTime } from '@shared/helpers/formatTime'
import { IWorkingTimeRepository } from '../../../repositories/IWorkingTimeRepository'
import { IWorkingTimeSQL } from '../../interfaces/IWorkingTimeSQL'
import { IWorkingTimeDetails } from '../../../useCases/DetailsWorkingTime/DetailsWorkingTimeUseCase'

class WorkingTimeRepository implements IWorkingTimeRepository {
  mapDetails(data: IWorkingTimeSQL[]): IWorkingTimeDetails[] {
    const workingTime: IWorkingTimeDetails[] = Array.from(
      { length: 7 },
      (_, i) => ({
        day: i + 1,
        firstEntry: null,
        firstExit: null,
        secondEntry: null,
        secondExit: null,
        thirdEntry: null,
        thirdExit: null
      })
    )

    data.forEach(time => {
      const dayIndex = parseInt(time.ID_DIA_SEMA, 10) - 1
      workingTime[dayIndex].firstEntry = formatTime(time.HR_ENTR_1)
      workingTime[dayIndex].firstExit = formatTime(time.HR_SAID_1)
      workingTime[dayIndex].secondEntry = formatTime(time.HR_ENTR_2)
      workingTime[dayIndex].secondExit = formatTime(time.HR_SAID_2)
      workingTime[dayIndex].thirdEntry = formatTime(time.HR_ENTR_3)
      workingTime[dayIndex].thirdExit = formatTime(time.HR_SAID_3)
    })

    return workingTime
  }

  async getWorkingTimeByWorkingDayId(
    uuid: string
  ): Promise<IResponseRepository<IWorkingTimeSQL>> {
    let response: IResponseRepository<IWorkingTimeSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_JORN_TRAB', sql.UniqueIdentifier, uuid)
        .execute('[dbo].[PRC_JORN_TRAB_DETA_CONS]')

      const { recordset: workingTime } = result

      response = {
        success: true,
        data: workingTime
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

export { WorkingTimeRepository }
