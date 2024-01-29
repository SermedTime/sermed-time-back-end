import { IScheduleSQL } from '../infra/interfaces'

interface IScheculeList {
  schedule_id: string
  team_id: string
  team_name: string
  user_id: string
  user_name: string
  title: string
  shift_id: string
  shift_name: string
  start: Date
  end: Date
  shift_initials: string
}

class ScheduleListMap {
  static ToDTO(data: IScheduleSQL[]): IScheculeList[] {
    const user = data.map(i => {
      const date_schedule = i.DT_ESCA.toISOString().split('T')[0]

      return {
        schedule_id: i.UUID_ESCA,
        team_id: i.UUID_EQUI,
        team_name: i.NM_EQUI,
        user_id: i.UUID_USUA,
        user_name: i.NM_USUA,
        title: i.NM_SOCI_USUA,
        shift_id: i.UUID_TURN,
        shift_name: i.NM_TURN,
        start: new Date(`${date_schedule}T${i.HR_INIC_TURN}-0300`),
        end: new Date(`${date_schedule}T${i.HR_FINA_TURN}-0300`),
        shift_initials: i.SG_TURN
      }
    })

    return user
  }
}

export { ScheduleListMap, IScheculeList }
