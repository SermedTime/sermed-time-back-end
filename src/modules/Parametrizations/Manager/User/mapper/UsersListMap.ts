import { IUserSQL } from '../infra/SQLServer/interfaces'

interface IUsersList {
  uuid: string
  name: string
  socialName: string
  cpf: string
  status: string
  employeeCode: string
  position: string
  created_at: string
  resignation_date: string | null
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
        created_at: i.DT_CRIA,
        employeeCode: i.NR_IDEN_USUA,
        position: i.DS_FUNC,
        resignation_date: i.DT_DEMI
      }
    })

    return user
  }
}

export { UsersListMap, IUsersList }
