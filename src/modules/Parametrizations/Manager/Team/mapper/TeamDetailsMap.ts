import { ITeamSQL } from '../infra/SQLServer/interfaces/ITeamSQL'

interface ITeamDetailsMap {
  uuid: string
  name: string
  unitId: string
  status: string
}

class TeamDetailsMap {
  static toDTO(data: ITeamSQL): ITeamDetailsMap {
    return {
      uuid: data.UUID_EQUI,
      name: data.NM_EQUI,
      unitId: data.UUID_UNID,
      status: data.IN_STAT
    }
  }
}

export { TeamDetailsMap, ITeamDetailsMap }
