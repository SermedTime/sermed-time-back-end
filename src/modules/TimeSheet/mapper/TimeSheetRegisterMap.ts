import { ITimeSheetRegisteSQL } from '../infra/interfaces'

class TimeSheetRegisterMap {
  static ToDTO(data: ITimeSheetRegisteSQL[]) {
    const registers = data.map(i => {
      return i
    })

    console.log(registers)
  }
}

export { TimeSheetRegisterMap }
