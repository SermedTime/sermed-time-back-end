import { IResponseRepository } from '@services/Response/interfaces'
import { IParamsListWorkingDay } from '../useCases/ListWorkingDay/ListWorkingDayUseCase'
import { ICreateWorkingDayDTO } from '../dtos/ICreateWorkingDayDTO'
import { IWorkingDaySQL } from './interfaces/IWorkingDaySQL'

interface IWorkingDayRepository {
  upsert(data: ICreateWorkingDayDTO): Promise<IResponseRepository>
  list(
    data: IParamsListWorkingDay
  ): Promise<IResponseRepository<IWorkingDaySQL>>
  findById(uuid: string): Promise<IResponseRepository<IWorkingDaySQL>>
}

export { IWorkingDayRepository }
