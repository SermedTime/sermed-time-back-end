import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateHolidayDTO } from '../dtos/ICreateHolidayDTO'
import { IHolidaySQL } from '../infra/SQLServer/interfaces/IHolidaySQL'
import { IHolidayListParams } from '../useCases/ListHoliday/ListHolidayUseCase'

interface IHolidayRepository {
  upsert(data: ICreateHolidayDTO): Promise<IResponseRepository>
  list(data: IHolidayListParams): Promise<IResponseRepository<IHolidaySQL>>
  findById(uuid: string): Promise<IResponseRepository<IHolidaySQL>>
}

export { IHolidayRepository }
