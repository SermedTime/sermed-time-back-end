import { ICompanySQL } from '../infra/SQLServer/interfaces/ICompanySQL'

interface ICompanyDetailsMap {
  idErp: string
  uuid: string
  companyName: string
  companyCnpj: string
  zipCode: string
  streetName: string
  streetNumber: string
  complement: string
  neighborhood: string
  city: string
  state: string
  status: string
}

class CompanyDetailsMap {
  static toDTO(data: ICompanySQL): ICompanyDetailsMap {
    return {
      idErp: data.ID_REFE_ERP,
      uuid: data.UUID_EMPR,
      companyName: data.NM_EMPR,
      companyCnpj: data.NR_CNPJ,
      zipCode: data.NR_CEP,
      streetName: data.DS_LOGR,
      streetNumber: data.NR_LOGR,
      complement: data.DS_COMP,
      neighborhood: data.NM_BAIR,
      city: data.NM_MUNI,
      state: data.DS_UF,
      status: data.IN_STAT
    }
  }
}

export { ICompanyDetailsMap, CompanyDetailsMap }
