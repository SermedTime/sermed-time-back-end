import sql from 'mssql'

import { IResponseRepository } from 'services/Response/interfaces'
import { getPool } from '@shared/infra/database/config'
import { IAssignPermissionRepository } from '../../../repositories/IAssignPermissionRepository'
import { IAssignPermissionSQL, IPermissionsSQL } from '../interfaces'
import { ICreateAssignPermissionDTO } from '../../../dtos/ICreateAssignPermissionDTO'
import { IRequestAssignPermission } from '../../../useCases/AssignPermission/ListAssignPermission/ListAssignPermissionUseCase'

class AssignPermissionRepository implements IAssignPermissionRepository {
  async Create({
    user_id,
    permission_id,
    is_writer,
    user_action
  }: Omit<ICreateAssignPermissionDTO, 'uuid'>): Promise<IResponseRepository> {
    let response: IResponseRepository

    try {
      const pool = await getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), user_id)
        .input('UUID_PERM', sql.NVarChar(36), permission_id)
        .input('IN_ESCR', sql.Bit, is_writer)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), user_action)
        .execute('[dbo].[PRC_CORE_USUA_X_PERM_GRAV]')

      const { recordset: permissions } = result

      response = {
        success: true,
        data: permissions
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
    uuid,
    is_writer,
    user_action
  }: Omit<ICreateAssignPermissionDTO, 'user_id' | 'permission_id'>): Promise<
    IResponseRepository<any>
  > {
    let response: IResponseRepository

    try {
      const pool = await getPool()

      const result = await pool
        .request()
        .input('UUID_USUA_X_PERM', sql.NVarChar(36), uuid)
        .input('IN_ESCR', sql.Bit, is_writer)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), user_action)
        .execute('[dbo].[PRC_CORE_USUA_X_PERM_GRAV]')

      const { recordset: permissions } = result

      response = {
        success: true,
        data: permissions
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async Delete({
    uuid,
    user_action
  }: Omit<
    ICreateAssignPermissionDTO,
    'user_id' | 'permission_id' | 'is_writer'
  >): Promise<IResponseRepository<any>> {
    let response: IResponseRepository

    try {
      const pool = await getPool()

      const result = await pool
        .request()
        .input('UUID_USUA_X_PERM', sql.NVarChar(36), uuid)
        .input('UUID_USUA_ACAO', sql.NVarChar(36), user_action)
        .input('IN_DELE', sql.Bit, 1)
        .execute('[dbo].[PRC_CORE_USUA_X_PERM_GRAV]')

      const { recordset: permissions } = result

      response = {
        success: true,
        data: permissions
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
    is_writer,
    page,
    records,
    order
  }: IRequestAssignPermission): Promise<
    IResponseRepository<IAssignPermissionSQL>
  > {
    let response: IResponseRepository

    try {
      const pool = await getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), user_id)
        .input('IN_ESCR', sql.Bit, is_writer === 'active' ? 1 : 0)
        .input('NR_PAGE_INIC', sql.Int, page)
        .input('TT_REGI_PAGI', sql.Int, records)
        .input('DS_ORDE_TYPE', sql.VarChar(4), order)
        .execute('[dbo].[PRC_CORE_USUA_X_PERM_CONS]')

      const { recordset: permissions } = result

      response = {
        success: true,
        data: permissions
      }
    } catch (err) {
      response = {
        success: false,
        message: err.message
      }
    }

    return response
  }

  async findPermissions(
    user_id: string
  ): Promise<IResponseRepository<IPermissionsSQL>> {
    let response: IResponseRepository

    try {
      const pool = await getPool()

      const result = await pool
        .request()
        .input('UUID_USUA', sql.NVarChar(36), user_id)
        .execute('[dbo].[PRC_CORE_PERM_DROP_DOWN]')

      const { recordset: permissions } = result

      response = {
        success: true,
        data: permissions
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

export { AssignPermissionRepository }
