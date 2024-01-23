import { IResponseRepository } from 'services/Response/interfaces'
import { IPermissionsSQL } from '../infra/SQLServer/interfaces'

interface IAssignPermissionRepository {
  findPermissions(
    user_id?: string
  ): Promise<IResponseRepository<IPermissionsSQL>>
}

export { IAssignPermissionRepository }
