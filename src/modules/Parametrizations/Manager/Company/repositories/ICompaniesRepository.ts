import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateCompanyDTO } from '../dtos/ICreateCompanyDTO'
import { IParamsListCompanies } from '../useCases/ListCompanies/ListCompaniesUseCase'
import { ICompanySQL } from '../infra/SQLServer/interfaces/ICompanySQL'

interface ICompaniesRepository {
  upsert(data: ICreateCompanyDTO): Promise<IResponseRepository>
  list(data: IParamsListCompanies): Promise<IResponseRepository<ICompanySQL>>
}

export { ICompaniesRepository }
