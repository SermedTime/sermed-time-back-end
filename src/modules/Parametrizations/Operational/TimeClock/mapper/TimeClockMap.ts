import { ITimeClockSQL } from '../infra/SQLServer/interfaces/ITimeClockSQL'

export interface IListTimeClock {
  uuid: string
  name: string
  created_at: string
  lastUpdate: string
  status: string
}

class TimeClockMap {
  static ToDTO(data: ITimeClockSQL[]) {
    const timeClockDTO = data.map(timeClock => {
      return {
        uuid: timeClock.UUID_RELO_PONT,
        name: timeClock.NM_RELO_PONT,
        created_at: timeClock.DT_CRIA,
        lastUpdate: timeClock.DT_ULTI_REGI,
        status: timeClock.IN_STAT
      }
    })

    return timeClockDTO
  }
}

export { TimeClockMap }
