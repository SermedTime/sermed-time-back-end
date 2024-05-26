import { IUnitSQL } from '../infra/SQLServer/interfaces/IUnitSQL'

interface IUnitDetails {
  uuid: string
  unitName: string
  streetName: string
  streetNumber: string
  complement?: string | null
  neighborhood: string
  city: string
  state: string
  zipCode: string
  ibgeCode: string
  createdAt: string
  status: string
}

class UnitDetailsMap {
  static toDTO(data: IUnitSQL): IUnitDetails {
    return {
      uuid: data.UUID_UNID,
      unitName: data.NM_UNID,
      streetName: data.DS_LOGR,
      streetNumber: data.NR_LOGR,
      complement: data.DS_COMP,
      neighborhood: data.NM_BAIR,
      city: data.NM_MUNI,
      state: data.DS_UF,
      zipCode: data.NR_CEP,
      ibgeCode: data.CD_IBGE,
      createdAt: data.DT_CRIA,
      status: data.NM_STAT
    }
  }
}

export { UnitDetailsMap, IUnitDetails }
