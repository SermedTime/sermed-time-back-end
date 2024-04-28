import { IWorkingDaySQL } from '../repositories/interfaces/IWorkingDaySQL'

interface IDetailsWorkingDay {
  uuid: string
  workingDayName: string
  createdAt: string
  status: string
}

class WorkingDayDetailsMap {
  static toDTO(data: IWorkingDaySQL): IDetailsWorkingDay {
    return {
      uuid: data.UUID_JORN_TRAB,
      workingDayName: data.NM_JORN_TRAB,
      createdAt: data.DT_CRIA,
      status: data.NM_STAT
    }
  }
}

export { WorkingDayDetailsMap, IDetailsWorkingDay }
