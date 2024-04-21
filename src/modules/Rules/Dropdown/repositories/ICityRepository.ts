import { IResponseRepository } from 'services/Response/interfaces'

import { ICitySQL } from '../infra/SQLServer/interfaces/ICitySQL'

interface ICityRepository {
  dropdown(state: string): Promise<IResponseRepository<ICitySQL>>
}

export { ICityRepository }
