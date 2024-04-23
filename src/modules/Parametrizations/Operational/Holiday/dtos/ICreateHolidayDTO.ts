interface ICreateHolidayDTO {
  uuid?: string
  date: Date | null
  description: string
  holidayType: 'N' | 'E' | 'M'
  state?: string
  city?: string
  user_action: string
}

export { ICreateHolidayDTO }
