import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { statusVerify } from '@utils/statusVerify'

import { ACTION_USER } from '@utils/ActionUser'

import { IResponseRepository } from 'services/Response/interfaces'
import { ITeamSQL } from '../interfaces/ITeamSQL'
import { ICreateTeamDTO } from '../../../dtos/ICreateTeamDTO'
import { ITeamRepository } from '../../../repositories/ITeamRepository'
import { IParamsListTeam } from '../../../useCases/ListTeam/ListTeamUseCase'

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
        .input('UUID_USUA_ACAO', sql.NVarChar(36), ACTION_USER)
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

  async list({
    order,
    page,
    records,
    search,
    searchingBy,
    status
  }: IParamsListTeam): Promise<IResponseRepository<ITeamSQL>> {
    let response: IResponseRepository<ITeamSQL>
    const name = searchingBy === 'name' ? search : ''
    const in_stat = statusVerify(status)

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('NM_EQUI', sql.VarChar(128), name)
        .input('IN_STAT', sql.Bit, in_stat)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('TT_REGI_PAGI', sql.Int, records)
        .input('DS_ORDE_TYPE', sql.VarChar(4), order)
        .execute('[dbo].[PRC_EQUI_CONS]')

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

  async findById(uuid: string): Promise<IResponseRepository<ITeamSQL>> {
    let response: IResponseRepository<ITeamSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID_EQUI', sql.UniqueIdentifier, uuid)
        .execute('[dbo].[PRC_EQUI_CONS]')

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

  async findAll(allTeams?: string): Promise<IResponseRepository<ITeamSQL>> {
    let response: IResponseRepository<ITeamSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('ALL', sql.Bit, allTeams === 'true' ? 1 : 0)
        .execute('[dbo].[PRC_EQUI_DROP_DOWN]')

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
