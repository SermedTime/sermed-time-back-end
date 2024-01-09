import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateTeamDTO } from '../../../dtos/ICreateTeamDTO'
import { ITeamRepository } from '../../../repositories/ITeamRepository'

class TeamRepository implements ITeamRepository {
  async upsert({
    name,
    status,
    uuid
  }: ICreateTeamDTO): Promise<IResponseRepository> {
    let response: IResponseRepository
    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID', sql.UniqueIdentifier, uuid)
        .input('NM_EQUI', sql.VarChar(128), name)
        .input('IN_STAT', sql.Bit, status)
        .execute('[dbo].[PRC_EQUI_GRAV]')

      const { recordset: team } = result

      response = {
        success: true,
        data: team
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

export { TeamRepository }
