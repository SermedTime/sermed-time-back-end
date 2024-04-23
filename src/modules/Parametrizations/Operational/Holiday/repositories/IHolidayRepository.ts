import { IResponseRepository } from 'services/Response/interfaces'
import { IHolidaySQL } from '../infra/SQLServer/interfaces/IHolidaySQL'
import { IHolidayListParams } from '../useCases/ListHoliday/ListHolidayUseCase'

interface IHolidayRepository {
  list(data: IHolidayListParams): Promise<IResponseRepository<IHolidaySQL>>
}

export { IHolidayRepository }
