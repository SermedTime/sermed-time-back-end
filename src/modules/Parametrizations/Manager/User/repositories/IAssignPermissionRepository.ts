import { IResponseRepository } from 'services/Response/interfaces'
import {
  IAssignPermissionSQL,
  IPermissionsSQL
} from '../infra/SQLServer/interfaces'
import { ICreateAssignPermissionDTO } from '../dtos/ICreateAssignPermissionDTO'
import { IRequestAssignPermission } from '../useCases/AssignPermission/ListAssignPermission/ListAssignPermissionUseCase'

interface IAssignPermissionRepository {
  Create(
    data: Omit<ICreateAssignPermissionDTO, 'uuid'>
  ): Promise<IResponseRepository>
  Update(
    data: Omit<ICreateAssignPermissionDTO, 'user_id' | 'permission_id'>
  ): Promise<IResponseRepository>

  Delete(
    data: Omit<
      ICreateAssignPermissionDTO,
      'user_id' | 'permission_id' | 'is_writer'
    >
  ): Promise<IResponseRepository>
  List(
    data: IRequestAssignPermission
  ): Promise<IResponseRepository<IAssignPermissionSQL>>
  findPermissions(
    user_id?: string
  ): Promise<IResponseRepository<IPermissionsSQL>>
}

export { IAssignPermissionRepository }
