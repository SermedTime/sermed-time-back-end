import { ITimeSheetListRegistersSQL } from '../infra/interfaces'

interface IRegister {
  hoursSummaryId: string
  date: Date
  day: string
  firstEntry: Date
  firstExit: Date
  secondEntry: Date
  secondExit: Date
  thirdEntry: Date
  thirdExit: Date
  overtime: number
}

class TimeSheetRegisterMap {
  static ToDTO(data: ITimeSheetListRegistersSQL[]): IRegister[] {
    const registers: IRegister[] = data.map(i => {
      return {
        hoursSummaryId: i.UUID_RESU_HORA,
        date: i.DT_MARC,
        day: i.NM_DIA_SEMA,
        firstEntry: i.HR_ENTR_1,
        firstExit: i.HR_SAID_1,
        secondEntry: i.HR_ENTR_2,
        secondExit: i.HR_SAID_2,
        thirdEntry: i.HR_ENTR_3,
        thirdExit: i.HR_SAID_3,
        overtime: i.HR_SALD
      }
    })

    return registers
  }
}

export { TimeSheetRegisterMap }
