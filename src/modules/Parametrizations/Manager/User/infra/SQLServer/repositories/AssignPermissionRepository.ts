import sql from 'mssql'

import { IResponseRepository } from 'services/Response/interfaces'
import { getPool } from '@shared/infra/database/config'
import { IAssignPermissionRepository } from '../../../repositories/IAssignPermissionRepository'
import { IPermissionsSQL } from '../interfaces'

class AssignPermissionRepository implements IAssignPermissionRepository {
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
