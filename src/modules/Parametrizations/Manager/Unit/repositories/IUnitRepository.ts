import { IResponseRepository } from 'services/Response/interfaces'
import { IParamsListUnit } from '../useCases/ListUnit/ListUnitUseCase'
import { IUnitSQL } from '../infra/SQLServer/interfaces/IUnitSQL'

interface IUnitRepository {
  list(data: IParamsListUnit): Promise<IResponseRepository<IUnitSQL>>
}

export { IUnitRepository }
