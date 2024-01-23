import { IAssignPermissionSQL } from '../infra/SQLServer/interfaces'

interface IAssignPermissionList {
  uuid: string
  permission_name: string
  permission_id: string
  is_writer: string
  created_at: string
}

class AssignPermissionMap {
  static ToDTO(data: IAssignPermissionSQL[]): IAssignPermissionList[] {
    const user = data.map(i => {
      return {
        uuid: i.UUID_USUA_X_PERM,
        permission_name: i.NM_PERM,
        permission_id: i.UUID_PERM,
        is_writer: i.IN_ESCR ? 'active' : 'inactive',
        created_at: i.DT_CRIA
      }
    })

    return user
  }
}

export { AssignPermissionMap, IAssignPermissionList }
