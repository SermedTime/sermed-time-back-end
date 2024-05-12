/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { IResponseRepository } from '@services/Response/interfaces'
import { formatTime } from '@shared/helpers/formatTime'
import { IWorkingTimeRepository } from '../../../repositories/IWorkingTimeRepository'
import { IWorkingTimeSQL } from '../../interfaces/IWorkingTimeSQL'
import { IWorkingTimeDetails } from '../../../useCases/DetailsWorkingTime/DetailsWorkingTimeUseCase'
import { IRegisterWorkingTimeDTO } from '../../../dtos/IRegisterWorkingTimeDTO'

class WorkingTimeRepository implements IWorkingTimeRepository {
  async upsert({
    userAction,
    workingDayId,
    workingTime
  }: IRegisterWorkingTimeDTO): Promise<IResponseRepository<any>> {
    let response: IResponseRepository<any>

    const pool = getPool()

    const transaction = new sql.Transaction(pool)

    try {
      await transaction.begin()

      const request = new sql.Request(transaction)

      for (const time of workingTime) {
        request.input('UUID_JORN_TRAB', sql.UniqueIdentifier, workingDayId)
        request.input('ID_DIA_SEMA', sql.TinyInt, time.day)
        request.input('HR_ENTR_1', sql.VarChar(5), time.firstEntry)
        request.input('HR_SAID_1', sql.VarChar(5), time.firstExit)
        request.input('HR_ENTR_2', sql.VarChar(5), time.secondEntry)
        request.input('HR_SAID_2', sql.VarChar(5), time.secondExit)
        request.input('HR_ENTR_3', sql.VarChar(5), time.thirdEntry)
        request.input('HR_SAID_3', sql.VarChar(5), time.thirdExit)
        request.input('UUID_USUA_ACAO', sql.UniqueIdentifier, userAction)

        await request.execute('[dbo].[PRC_JORN_TRAB_DETA_GRAV]')
        request.parameters = {}
      }

      await transaction.commit()
      response = {
        success: true,
        data: workingTime
      }
    } catch (err) {
      await transaction.rollback()
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

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
