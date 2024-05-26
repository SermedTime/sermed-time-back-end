import { ITimeClockSQL } from '../infra/SQLServer/interfaces/ITimeClockSQL'

export interface ITimeClockDetailsMap {
  uuid: string
  clock_ip: string
  manufacturer: string
  model: string
  name: string
  sector: string
  unit: string
  created_at: string
  status: string
}

class TimeClockDetailsMap {
  static toDTO(data: ITimeClockSQL) {
    return {
      uuid: data.IP_RELO_PONT,
      clock_ip: data.IP_RELO_PONT,
      manufacturer: data.NM_FABR,
      model: data.NM_MODE,
      name: data.NM_RELO_PONT,
      sector: data.NM_SETO,
      unit: data.UUID_UNID,
      created_at: data.DT_CRIA,
      status: data.IN_STAT
    }
  }
}

export { TimeClockDetailsMap }
