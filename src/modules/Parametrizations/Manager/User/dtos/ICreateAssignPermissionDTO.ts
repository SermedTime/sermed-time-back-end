interface ICreateAssignPermissionDTO {
  uuid: string
  user_id: string
  permission_id: string
  is_writer: 1 | 0
  user_action: string
}

export { ICreateAssignPermissionDTO }
