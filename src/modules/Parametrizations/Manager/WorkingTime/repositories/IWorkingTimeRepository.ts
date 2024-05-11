import { IResponseRepository } from '@services/Response/interfaces'
import { IWorkingTimeSQL } from '../infra/interfaces/IWorkingTimeSQL'
import { IWorkingTimeDetails } from '../useCases/DetailsWorkingTime/DetailsWorkingTimeUseCase'

interface IWorkingTimeRepository {
  getWorkingTimeByWorkingDayId(
    uuid: string
  ): Promise<IResponseRepository<IWorkingTimeSQL>>
  mapDetails(data: IWorkingTimeSQL[]): IWorkingTimeDetails[]
}

export { IWorkingTimeRepository }
