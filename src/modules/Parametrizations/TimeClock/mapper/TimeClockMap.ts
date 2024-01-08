import { ITimeClockSQL } from '../infra/SQLServer/interfaces/ITimeClockSQL'

export interface IListTimeClock {
  uuid: string
  name: string
  created_at: string
  status: string
}

class TimeClockMap {
  static ToDTO(data: ITimeClockSQL[]) {
    const timeClockDTO = data.map(timeClock => {
      return {
        uuid: timeClock.UUID_RELO_PONT,
        name: timeClock.NM_RELO_PONT,
        created_at: timeClock.DT_CRIA,
        status: timeClock.IN_STAT ? 'active' : 'inactive'
      }
    })

    return timeClockDTO
  }
}

export { TimeClockMap }
