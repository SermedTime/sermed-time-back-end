import { IHolidaySQL } from '../infra/SQLServer/interfaces/IHolidaySQL'

interface IHolidayDetails {
  uuid: string
  description: string
  date: string
  state: string
  city: string
  holidayType: string
}

class HolidayDetailsMap {
  static toDTO(data: IHolidaySQL): IHolidayDetails {
    return {
      uuid: data.UUID_FERI,
      description: data.NM_FERI,
      date: data.DT_FERI,
      state: data.DS_UF,
      city: data.UUID_MUNI,
      holidayType: data.TP_FERI
    }
  }
}

export { IHolidayDetails, HolidayDetailsMap }
