import { ITimeSheetRegisteSQL } from '../infra/interfaces'

interface IRegister {
  registerId: string
  registerUuid: string
  registerNumber: number
  appointment_date: Date
  crc16: string
  pis: string
  userUuid: string
  timeClockId: string
  isEdit: boolean
}

class TimeSheetRegisterMap {
  static ToDTO(data: ITimeSheetRegisteSQL[]): IRegister[] {
    const registers: IRegister[] = data.map(i => {
      return {
        registerId: i.ID_REGI,
        registerUuid: i.UUID_REGI,
        registerNumber: Number(i.NR_MARC),
        appointment_date: i.DT_MARC,
        crc16: i.CD_CRC_16,
        pis: i.NR_PIS,
        userUuid: i.UUID_USUA,
        timeClockId: i.ID_RELO_PONT,
        isEdit: i.IN_EDIT
      }
    })

    return registers
  }
}

export { TimeSheetRegisterMap }
