import { IHolidaySQL } from '../infra/SQLServer/interfaces/IHolidaySQL'

interface IHolidayList {
  uuid: string
  name: string
  date: string
  state: string
  city: string
  holidayType: string
}

class HolidayMap {
  static toDTO(data: IHolidaySQL[]): IHolidayList[] {
    const holidayDTO: IHolidayList[] = data.map(i => {
      return {
        uuid: i.UUID_FERI,
        name: i.NM_FERI,
        date: i.DT_FERI,
        state: i.DS_UF,
        city: i.NM_MUNI,
        holidayType: i.TP_FERI
      }
    })

    return holidayDTO
  }
}

export { HolidayMap, IHolidayList }
