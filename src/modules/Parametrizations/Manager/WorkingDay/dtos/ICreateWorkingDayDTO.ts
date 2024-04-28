interface ICreateWorkingDayDTO {
  uuid?: string
  workingDayName: string
  status: string | number
  userAction: string
}

export { ICreateWorkingDayDTO }
