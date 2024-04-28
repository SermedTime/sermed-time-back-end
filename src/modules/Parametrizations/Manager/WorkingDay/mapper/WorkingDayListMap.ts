import { IWorkingDaySQL } from '../repositories/interfaces/IWorkingDaySQL'

export interface IListWorkingDay {
  uuid: string
  workingDayName: string
  createdAt: string
  status: string
}

class WorkingDayListMap {
  static toDTO(data: IWorkingDaySQL[]): IListWorkingDay[] {
    const workingDayDTO: IListWorkingDay[] = data.map(i => {
      return {
        uuid: i.UUID_JORN_TRAB,
        workingDayName: i.NM_JORN_TRAB,
        createdAt: i.DT_CRIA,
        status: i.NM_STAT
      }
    })

    return workingDayDTO
  }
}

export { WorkingDayListMap }
