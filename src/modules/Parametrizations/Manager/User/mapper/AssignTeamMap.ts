import { IAssignTeamSQL } from '../infra/SQLServer/interfaces'

interface IAssignTeamList {
  uuid: string
  team_name: string
  team_id: string
  is_supervisor: string
  created_at: string
}

class AssignTeamMap {
  static ToDTO(data: IAssignTeamSQL[]): IAssignTeamList[] {
    const user = data.map(i => {
      return {
        uuid: i.UUID_USUA_X_EQUI,
        team_name: i.NM_EQUI,
        team_id: i.UUID_EQUI,
        is_supervisor: i.IN_SUPE ? 'active' : 'inactive',
        created_at: i.DT_CRIA
      }
    })

    return user
  }
}

export { AssignTeamMap, IAssignTeamList }
