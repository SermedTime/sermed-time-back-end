import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { statusVerify } from '@utils/statusVerify'

import { IResponseRepository } from 'services/Response/interfaces'
import { IRequestTeamsDropdown } from '@modules/Rules/Dropdown/Parametrizations/TeamDropdown/TeamDropdownUseCase'
import { ITeamSQL } from '../interfaces/ITeamSQL'
import { ICreateTeamDTO } from '../../../dtos/ICreateTeamDTO'
import { ITeamRepository } from '../../../repositories/ITeamRepository'
import { IParamsListTeam } from '../../../useCases/ListTeam/ListTeamUseCase'

class TeamRepository implements ITeamRepository {
  async upsert({
    name,
    unitId,
    status,
    uuid,
    user_action
  }: ICreateTeamDTO): Promise<IResponseRepository> {
    let response: IResponseRepository
    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('UUID', sql.UniqueIdentifier, uuid)
        .input('NM_EQUI', sql.VarChar(128), name)
        .input('UUID_UNID', sql.UniqueIdentifier, unitId)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), user_action)
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
    status,
    unit
  }: IParamsListTeam): Promise<IResponseRepository<ITeamSQL>> {
    let response: IResponseRepository<ITeamSQL>
    const name = searchingBy === 'name' ? search : ''
    const in_stat = statusVerify(status)

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('NM_EQUI', sql.VarChar(128), name)
        .input('UUID_UNID', sql.UniqueIdentifier, unit)
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

  async findAll({
    allTeams,
    user_id,
    unitId
  }: IRequestTeamsDropdown): Promise<IResponseRepository<ITeamSQL>> {
    let response: IResponseRepository<ITeamSQL>

    try {
      const pool = getPool()

      const result = await pool
        .request()
        .input('ALL', sql.Bit, allTeams === 'active' ? 1 : null)
        .input('UUID_USUA', sql.UniqueIdentifier, user_id)
        .input('UUID_UNID', sql.UniqueIdentifier, unitId)
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

  async getTeamByUser(
    teamLeadId: string,
    onlyTeamLead: boolean
  ): Promise<IResponseRepository<ITeamSQL>> {
    let response: IResponseRepository<ITeamSQL>

    const query = `
    SELECT
      DISTINCT E.UUID AS UUID_EQUI
    FROM TB_USUA_X_EQUI		UE
    JOIN TB_EQUI			E	ON E.ID = UE.ID_EQUI
    JOIN TB_USUA			U	ON U.ID = UE.ID_USUA
    WHERE
      U.UUID = TRY_CAST('${teamLeadId}' AS UNIQUEIDENTIFIER)
    ${onlyTeamLead && 'AND UE.IN_SUPE = 1'}
    `

    try {
      const pool = getPool()

      const team = (await pool.request().query(query)).recordset

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
