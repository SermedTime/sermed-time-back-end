import { IUnitSQL } from '../infra/SQLServer/interfaces/IUnitSQL'

interface IUnitDetails {
  uuid: string
  unitName: string
  createdAt: string
  status: string
}

class UnitDetailsMap {
  static toDTO(data: IUnitSQL): IUnitDetails {
    return {
      uuid: data.UUID_UNID,
      unitName: data.NM_UNID,
      createdAt: data.DT_CRIA,
      status: data.NM_STAT
    }
  }
}

export { UnitDetailsMap, IUnitDetails }
