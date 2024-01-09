import { ITeamSQL } from '../infra/SQLServer/interfaces/ITeamSQL'

interface IListTeam {
  uuid: string
  name: string
  created_at: string
  status: string
}

class TeamMap {
  static ToDTO(data: ITeamSQL[]): IListTeam[] {
    const teamDTO = data.map(i => {
      return {
        uuid: i.UUID_EQUI,
        name: i.NM_EQUI,
        created_at: i.DT_CRIA,
        status: i.IN_STAT
      }
    })

    return teamDTO
  }
}

export { TeamMap, IListTeam }
