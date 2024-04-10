import { IUnitSQL } from '../infra/SQLServer/interfaces/IUnitSQL'

interface IListUnit {
  uuid: string
  unitName: string
  createdAt: string
  status: string
}

class UnitMap {
  static toDTO(data: IUnitSQL[]): IListUnit[] {
    const unitDTO: IListUnit[] = data.map(i => {
      return {
        uuid: i.UUID_UNID,
        unitName: i.NM_UNID,
        createdAt: i.DT_CRIA,
        status: i.NM_STAT
      }
    })

    return unitDTO
  }
}

export { IListUnit, UnitMap }
