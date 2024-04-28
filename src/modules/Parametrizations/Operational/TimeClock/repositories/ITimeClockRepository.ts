import { IResponseRepository } from 'services/Response/interfaces'
import {
  ICreateTimeClockDTO,
  IUpdateTimeClockDTO
} from '../dtos/ICreateTimeClockDTO'

import { IParamsListTimeClock } from '../useCases/ListTimeClock/ListTimeClockUseCase'
import {
  ITimeClockRegister,
  ITimeClockSQL
} from '../infra/SQLServer/interfaces/ITimeClockSQL'

interface ITimeClockRepository {
  upsert(
    data: ICreateTimeClockDTO | IUpdateTimeClockDTO
  ): Promise<IResponseRepository>
  list(data: IParamsListTimeClock): Promise<IResponseRepository<ITimeClockSQL>>
  listIps(): Promise<IResponseRepository<ITimeClockRegister>>
  findById(uuid: string): Promise<IResponseRepository<ITimeClockSQL>>
}

export { ITimeClockRepository }
