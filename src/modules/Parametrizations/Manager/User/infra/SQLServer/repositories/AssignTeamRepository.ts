import sql from 'mssql'

import { getPool } from '@shared/infra/database/config'

import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateAssignTeamDTO } from '../../../dtos/ICreateAssignTeamDTO'
import { IAssignTeamRepository } from '../../../repositories/IAssignTeamRepository'
import { IRequest } from '../../../useCases/AssignTeam/ListAssign/ListAssignUseCase'
import { IAssignTeamSQL } from '../interfaces'

class AssignTeamRepository implements IAssignTeamRepository {
  async Create({
    is_supervisor,
    team_id,
    user_action,
    user_id
  }: ICreateAssignTeamDTO): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = await getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), user_id)
        .input('UUID_EQUI', sql.NVarChar(36), team_id)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), user_action)
        .input('IN_SUPE', sql.Bit, is_supervisor)
        .execute('[dbo].[PRC_USUA_X_EQUI_GRAV]')

      const { recordset: membership } = result

      response = {
        success: true,
        data: membership
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async Update({
    assign_id,
    is_supervisor,
    user_action
  }: ICreateAssignTeamDTO): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = await getPool()

      const result = await pool
        .request()
        .input('UUID_USUA_X_EQUI', sql.NVarChar(36), assign_id)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), user_action)
        .input('IN_SUPE', sql.Bit, is_supervisor)
        .execute('[dbo].[PRC_USUA_X_EQUI_GRAV]')

      const { recordset: membership } = result

      response = {
        success: true,
        data: membership
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async List({
    user_id,
    is_supervisor,
    order,
    page,
    records
  }: IRequest): Promise<IResponseRepository<IAssignTeamSQL>> {
    let response: IResponseRepository<IAssignTeamSQL>

    try {
      const pool = await getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), user_id)
        .input('IN_SUPE', sql.Bit, is_supervisor === 'active' ? 1 : 0)
        .input('DS_ORDE_TYPE', sql.VarChar(4), order)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('TT_REGI_PAGI', sql.Int, records)
        .execute('[dbo].[PRC_USUA_X_EQUI_CONS]')

      const { recordset: membership } = result

      response = {
        success: true,
        data: membership
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

export { AssignTeamRepository }
