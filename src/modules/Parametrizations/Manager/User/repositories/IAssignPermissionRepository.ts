import { IResponseRepository } from 'services/Response/interfaces'
import { IPermissionsSQL } from '../infra/SQLServer/interfaces'
import { ICreateAssignPermissionDTO } from '../dtos/ICreateAssignPermissionDTO'

interface IAssignPermissionRepository {
  Create(
    data: Omit<ICreateAssignPermissionDTO, 'uuid'>
  ): Promise<IResponseRepository>
  findPermissions(
    user_id?: string
  ): Promise<IResponseRepository<IPermissionsSQL>>
}

export { IAssignPermissionRepository }
