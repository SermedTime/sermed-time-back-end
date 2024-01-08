import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateTimeClockDTO } from '../dtos/ICreateTimeClockDTO'
import { ICreateTimeClock } from '../useCases/CreateTimeClock/CreateTimeClockUseCase'
import { IParamsListTimeClock } from '../useCases/ListTimeClock/ListTimeClockUseCase'
import { ITimeClockSQL } from '../infra/SQLServer/interfaces/ITimeClockSQL'

interface ITimeClockRepository {
  create(
    data: ICreateTimeClockDTO
  ): Promise<IResponseRepository<ICreateTimeClock>>
  list(data: IParamsListTimeClock): Promise<IResponseRepository<ITimeClockSQL>>
  details(uuid: string): Promise<IResponseRepository<ITimeClockSQL>>
}

export { ITimeClockRepository }
