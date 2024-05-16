import { IUserSQL } from '../infra/SQLServer/interfaces'

interface IUserDetails {
  uuid: string
  cpf: string
  name: string
  socialName: string
  email: string
  companyUuid: string
  companyCnpj: string
  companyName: string
  workingDayId: string
  workingDayName: string
  position: string
  payrollNumber: string
  employeeCode: string
  pis: string
  ctps: string
  admissionDate: string | null
  resignationDate: string | null
  status: string
}

class UserDetailsMap {
  static toDTO(data: IUserSQL): IUserDetails {
    return {
      uuid: data.UUID_USUA,
      cpf: data.NR_CPF,
      name: data.NM_USUA,
      socialName: data.NM_SOCI_USUA,
      email: data.DS_MAIL,
      companyUuid: data.UUID_EMPR,
      companyCnpj: data.NR_CNPJ_EMPR,
      companyName: data.NM_EMPR,
      workingDayId: data.UUID_JORN_TRAB,
      workingDayName: data.NM_JORN_TRAB,
      position: data.DS_FUNC,
      payrollNumber: data.NR_FOLH_PAGA,
      employeeCode: data.NR_IDEN_USUA,
      pis: data.NR_PIS,
      ctps: data.NR_CTPS,
      admissionDate: data.DT_ADMI,
      resignationDate: data.DT_DEMI,
      status: data.IN_STAT
    }
  }
}

export { UserDetailsMap, IUserDetails }
