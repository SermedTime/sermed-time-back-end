import { IUserSQL } from '../infra/SQLServer/interfaces'

interface IUsersList {
  uuid: string
  name: string
  socialName: string
  cpf: string
  status: string
  created_at: string
}

class UsersListMap {
  static ToDTO(data: IUserSQL[]): IUsersList[] {
    const user = data.map(i => {
      return {
        uuid: i.UUID_USUA,
        name: i.NM_USUA,
        socialName: i.NM_SOCI_USUA,
        cpf: i.NR_CPF,
        status: i.IN_STAT,
        created_at: i.DT_CRIA
      }
    })

    return user
  }
}

export { UsersListMap, IUsersList }
