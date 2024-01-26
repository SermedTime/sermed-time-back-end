interface ICreateScheduleDTO {
  id?: string
  user_id: string
  team_id: string
  shift_id: string
  schedule_date: Date
  user_action: string
}

export { ICreateScheduleDTO }
