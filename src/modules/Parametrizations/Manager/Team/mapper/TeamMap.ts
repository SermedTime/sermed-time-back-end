import { ITeamSQL } from '../infra/SQLServer/interfaces/ITeamSQL'

interface IListTeam {
  uuid: string
  name: string
  created_at: string
  status: string
  totalEmployees: number
  totalActiveEmployees: number
}

class TeamMap {
  static ToDTO(data: ITeamSQL[]): IListTeam[] {
    const teamDTO = data.map(i => {
      return {
        uuid: i.UUID_EQUI,
        name: i.NM_EQUI,
        created_at: i.DT_CRIA,
        status: i.IN_STAT,
        totalEmployees: i.TT_FUNC,
        totalActiveEmployees: i.TT_FUNC_ATIV
      }
    })

    return teamDTO
  }
}

export { TeamMap, IListTeam }
