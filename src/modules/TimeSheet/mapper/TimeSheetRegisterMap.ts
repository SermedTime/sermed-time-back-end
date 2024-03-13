import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { ITimeSheetListRegisters } from '../infra/interfaces'

interface IRegister {
  date: Date
  day: string
  firstEntry: Date
  firstExit: Date
  secondEntry: Date
  secondExit: Date
  thirdEntry: Date
  thirdExit: Date
  overtime: Date
}

class TimeSheetRegisterMap {
  static ToDTO(data: ITimeSheetListRegisters[]): IRegister[] {
    const dateProvider = new DayjsDateProvider()

    const registers: IRegister[] = data.map(i => {
      return {
        date: i.DT_MARC,
        day: dateProvider.convertDateToWeekDay(i.DT_MARC),
        firstEntry: i.RG_ENTR_1,
        firstExit: i.RG_SAID_1,
        secondEntry: i.RG_ENTR_2,
        secondExit: i.RG_SAID_2,
        thirdEntry: i.RG_ENTR_3,
        thirdExit: i.RG_SAID_3,
        overtime: i.HR_EXTR
      }
    })

    return registers
  }
}

export { TimeSheetRegisterMap }
