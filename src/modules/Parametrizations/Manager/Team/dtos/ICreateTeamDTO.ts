interface ICreateTeamDTO {
  uuid?: string
  name: string
  unitId: string
  user_action: string
  status: string | number
}

export { ICreateTeamDTO }
