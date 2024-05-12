import { IResponseRepository } from '@services/Response/interfaces'
import { IWorkingTimeSQL } from '../infra/interfaces/IWorkingTimeSQL'
import { IWorkingTimeDetails } from '../useCases/DetailsWorkingTime/DetailsWorkingTimeUseCase'
import { IRegisterWorkingTimeDTO } from '../dtos/IRegisterWorkingTimeDTO'

interface IWorkingTimeRepository {
  upsert(data: IRegisterWorkingTimeDTO): Promise<IResponseRepository>
  getWorkingTimeByWorkingDayId(
    uuid: string
  ): Promise<IResponseRepository<IWorkingTimeSQL>>
  mapDetails(data: IWorkingTimeSQL[]): IWorkingTimeDetails[]
}

export { IWorkingTimeRepository }
