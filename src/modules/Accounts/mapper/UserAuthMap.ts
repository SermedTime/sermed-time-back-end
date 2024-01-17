import { IUserAuthSQL } from '../infra/SQLServer/interfaces/IUserAuthSQL'

interface IUserAuth {
  userUuid: string
  userName: string
  socialName: string
  email: string
  companyName: string
  companyCnpj: string
  sysPassword: boolean
  position: string
  pis: string
  identityNumber: string
  cpf: string
  admissionDate: string
  lastUpdateDate: string
}

class UserAuthMap {
  static toDTO(data: IUserAuthSQL): IUserAuth {
    return {
      userUuid: data.UUID_USUA,
      userName: data.NM_USUA,
      socialName: data.NM_SOCI_USUA,
      email: data.DS_MAIL,
      companyName: data.NM_EMPR,
      companyCnpj: data.NR_CNPJ_EMPR,
      sysPassword: data.IN_SYS_PASS,
      position: data.DS_FUNC,
      pis: data.NR_PIS,
      identityNumber: data.NR_IDEN_USUA,
      cpf: data.NR_CPF,
      admissionDate: data.DT_ADMI,
      lastUpdateDate: data.DT_ULTI_ATUA
    }
  }
}

export { UserAuthMap, IUserAuth }
