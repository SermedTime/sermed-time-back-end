import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)
dayjs.extend(timezone)

class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).local().format()
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)
    return dayjs(end_date_utc).diff(start_date_utc, 'hours')
  }

  dateNow(): Date {
    return dayjs().toDate()
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)
    return dayjs(end_date_utc).diff(start_date_utc, 'days')
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate()
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date)
  }

  monthDates(date: Date, page: number): string[] {
    const dates = []

    if (page > 4) return []

    const lastDayMonth = dayjs(date).endOf('month')

    const day = lastDayMonth.day()

    // const month = dayjs(date).month()

    console.log(day)

    // const range = {
    //   initialDate: page * 10 - 9,
    //   finalDate: Number(lastDayMonth) < 31 && page < 4 ? page * 10 : 31
    // }

    // for (let i = 1; i <= Number(lastDayMonth); i++) {
    //   const diaDoMes = dayjs(date).date(i)

    //   dates.push(diaDoMes.format('YYYY-MM-DD'))
    // }

    return dates
  }
}

export { DayjsDateProvider }
