import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateTimeClockDTO } from '../dtos/ICreateTimeClockDTO'
import { ICreateTimeClock } from '../useCases/CreateTimeClock/CreateTimeClockUseCase'

interface ITimeClockRepository {
  create(
    data: ICreateTimeClockDTO
  ): Promise<IResponseRepository<ICreateTimeClock>>
}

export { ITimeClockRepository }
