interface ICreateAssignTeamDTO {
  user_id: string
  team_id: string
  is_supervisor: 1 | 0
  user_action: string
}

export { ICreateAssignTeamDTO }
