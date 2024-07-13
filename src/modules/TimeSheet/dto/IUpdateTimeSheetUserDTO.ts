interface IUpdateTimeSheetUserDTO {
  timeSheetId: string | null
  date: string
  userId: string
  firstEntry: string | null
  firstExit: string | null
  secondEntry: string | null
  secondExit: string | null
  thirdEntry: string | null
  thirdExit: string | null
  userAction: string
}

export { IUpdateTimeSheetUserDTO }
