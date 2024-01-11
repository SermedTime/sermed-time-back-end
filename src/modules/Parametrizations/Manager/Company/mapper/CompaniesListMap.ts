import { ICompanySQL } from '../infra/SQLServer/interfaces/ICompanySQL'

interface ICompaniesList {
  uuid: string
  companyName: string
  created_at: string
  status: string
}

class CompaniesListMap {
  static ToDTO(data: ICompanySQL[]): ICompaniesList[] {
    const companiesDTO = data.map(i => {
      return {
        uuid: i.UUID_EMPR,
        companyName: i.NM_EMPR,
        created_at: i.DT_CRIA,
        status: i.IN_STAT
      }
    })

    return companiesDTO
  }
}

export { CompaniesListMap, ICompaniesList }
