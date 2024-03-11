import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)
dayjs.extend(timezone)

class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).local().format('YYYY-MM-DD')
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

    const lastDayMonth = dayjs(date).daysInMonth()
    const month = dayjs(date).month()

    if (page > 4 || (month === 1 && page > 3)) return []

    const range = {
      initialDate: page * 10 - 9,
      finalDate: page * 10 < lastDayMonth ? page * 10 : lastDayMonth
    }

    for (let i = range.initialDate; i <= range.finalDate; i++) {
      const diaDoMes = dayjs(date).date(i)

      dates.push(diaDoMes.format('YYYY-MM-DD'))
    }

    return dates
  }
}

export { DayjsDateProvider }
