interface IUpdateOvertimeDTO {
  timesheetId: string
  overtimeStatus: string
  reasorForRejection?: string
  releaseType?: string
  userAction: string
}

export { IUpdateOvertimeDTO }
