import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateCompanyDTO } from '../dtos/ICreateCompanyDTO'

interface ICompaniesRepository {
  upsert(data: ICreateCompanyDTO): Promise<IResponseRepository>
}

export { ICompaniesRepository }
