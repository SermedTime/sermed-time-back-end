import { ITimeClockSQL } from '../infra/SQLServer/interfaces/ITimeClockSQL'

export interface ITimeClockDetailsMap {
  uuid: string
  clock_ip: string
  city: string
  manufacturer: string
  model: string
  name: string
  sector: string
  state: string
  unit: string
  created_at: string
  status: string
}

class TimeClockDetailsMap {
  static toDTO(data: ITimeClockSQL) {
    return {
      uuid: data.IP_RELO_PONT,
      clock_ip: data.IP_RELO_PONT,
      city: data.DS_MUNI,
      manufacturer: data.NM_FABR,
      model: data.NM_MODE,
      name: data.NM_RELO_PONT,
      sector: data.NM_SETO,
      state: data.DS_UF,
      unit: data.DS_UNID,
      created_at: data.DT_CRIA,
      status: data.IN_STAT ? 'active' : 'inactive'
    }
  }
}

export { TimeClockDetailsMap }
