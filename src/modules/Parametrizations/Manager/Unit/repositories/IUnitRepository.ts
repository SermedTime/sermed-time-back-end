import { IResponseRepository } from 'services/Response/interfaces'
import { IParamsListUnit } from '../useCases/ListUnit/ListUnitUseCase'
import { IUnitSQL } from '../infra/SQLServer/interfaces/IUnitSQL'
import { ICreateUnitDTO } from '../dtos/ICreateUnitDTO'

interface IUnitRepository {
  upsert(data: ICreateUnitDTO): Promise<IResponseRepository>
  list(data: IParamsListUnit): Promise<IResponseRepository<IUnitSQL>>
  findById(uuid: string): Promise<IResponseRepository<IUnitSQL>>
}

export { IUnitRepository }
